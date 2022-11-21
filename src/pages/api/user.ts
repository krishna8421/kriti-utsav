import { type NextApiRequest, type NextApiResponse } from "next";
import { type User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { prisma } from "../../server/db/client";

const User = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
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

  const { username } = decoded as { username: string };

  const user = await prisma.user.findUnique({
    where: {
      username: username as string,
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if ((decoded as any).username !== user?.username) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.status(200).json({
    username: user.username,
    name: user.name,
    state: user.state,
  });
};

export default User;
