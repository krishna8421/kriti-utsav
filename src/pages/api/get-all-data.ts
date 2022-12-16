import { type NextApiRequest, type NextApiResponse } from "next";
import { use } from "react";
import { prisma } from "../../server/db/client";

const GetAllData = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).json({ error: "Forbidden (No username or password)" });
  }

  if (username !== "ksac" || password !== "7c57a-0b8f7-8c280-d7a5d") {
    return res.status(400).json({ error: "Forbidden (Wrong Credentials)" });
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        UserResponse: {
          include: {
            ContingentInCharge: true,
            ParticipationDetails: true,
          },
        },
      },
    });

    let noNullResponse = []
    console.log(users)
    users.map((user) => {
      if (user.UserResponse !== null) {
        noNullResponse.push(user)
      }
    })
    res.status(200).json({
      users: noNullResponse as any,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default GetAllData;
