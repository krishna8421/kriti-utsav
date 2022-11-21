import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import bycrypt from "bcrypt";

const Add = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { username, password, name, state } = req.body;
  if (!username || !password || !name || !state) {
    return res.status(400).json({ error: "No data provided" });
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        username,
        name,
        state,
        password: await bycrypt.hash(password, 10),
      },
    });
    console.log(user);
    res.status(200).json({ message: "User created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default Add;
