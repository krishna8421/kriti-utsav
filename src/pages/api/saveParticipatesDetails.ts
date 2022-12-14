import jwt from "jsonwebtoken";
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const Participates = async (req: NextApiRequest, res: NextApiResponse) => {
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

    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "Something went wrong" });
    }

    if (user.UserResponse) {
      // console.log({
      //   ParticipationDetails,
      //   ContingentInCharge,
      //   UserResponse,
      // });

      // ParticipationDetails?.map(async (d: any) => {
      //   await prisma.participationDetails.upsert({
      //     where: {
      //       id: d.id,
      //     },
      //     create: {
      //       userResponseId: user.UserResponse?.id,
      //       ...d,
      //     },
      //     update: {
      //       ...d,
      //     },
      //   });
      // });

      await Promise.all(
        ParticipationDetails?.map(async (d: any) => {
          // console.log({ ...d });
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
        })
      );
      //     );
      return res.status(200).json({
        message: "Updated",
        data: await prisma.userResponse.findUnique({
          where: { id: user.UserResponse.id },
          include: {
            ParticipationDetails: true,
          },
        }),
      });

      // ParticipationDetails?.map(async (d: any) => {
      //   await prisma.participationDetails.delete({
      //     where: {
      //       id: d.id,
      //     },
      //   });
      // });
      // ParticipationDetails?.map(async (d: any) => {
      //   await prisma.participationDetails.create({
      //     data: {[...d]}
      //   });
      // });
      // await prisma.userResponse.update({
      //   where: {
      //     id: user.UserResponse.id,
      //   },
      //   data: {
      //     ParticipationDetails: {
      //       create: [...ParticipationDetails],
      //     },
      //   },
      // });
      // return res.status(200).json({
      //   message: "Created",
      // });
    }

    const create = await prisma.userResponse.create({
      data: {
        userId: user.id,
        ParticipationDetails: {
          create: [...ParticipationDetails],
        },
      },
      include: {
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

export default Participates;
