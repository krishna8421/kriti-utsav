import jwt from "jsonwebtoken";
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const Seed = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
  }

  const headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = headerToken.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  if (!decoded) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { username } = decoded as { username: string };
    const {
      ParticipationDetails = [],
      ContingentInCharge = [],
      ...UserResponse
    } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        username: username as string,
      },
      include: {
        UserResponse: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Something went wrong" });
    }

    if (user.UserResponse) {
      // console.log({
      //   ParticipationDetails,
      //   ContingentInCharge,
      //   UserResponse,
      // });
      ContingentInCharge?.map(async (d: any) => {
        console.log({ ...d });
        await prisma.contingentInCharge.upsert({
          where: {
            id: d.id,
          },
          create: {
            userResponseId: user.UserResponse?.id,
            ...d,
          },
          update: {
            ...d,
          },
        });
      });

      ParticipationDetails?.map(async (d: any) => {
        console.log({ ...d });
        await prisma.participationDetails.upsert({
          where: {
            id: d.id,
          },
          create: {
            userResponseId: user.UserResponse?.id,
            ...d,
          },
          update: {
            ...d,
          },
        });
      });

      await prisma.userResponse.update({
        where: {
          id: user.UserResponse.id,
        },
        data: {
          ...UserResponse,
        },
      });
      return res.status(200).json({
        message: "Updated",
        data: await prisma.userResponse.findUnique({
          where: { id: user.UserResponse.id },
          include: {
            ContingentInCharge: true,
            ParticipationDetails: true,
          },
        }),
      });
    }

    const create = await prisma.userResponse.create({
      data: {
        userId: user.id,
        ...UserResponse,
        ContingentInCharge: {
          create: [...ContingentInCharge],
        },
        ParticipationDetails: {
          create: [...ParticipationDetails],
        },
      },
      include: {
        ContingentInCharge: true,
        ParticipationDetails: true,
      },
    });
    return res.status(200).json({
      message: "Created",
      data: create,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default Seed;
