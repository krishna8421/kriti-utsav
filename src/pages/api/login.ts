import { type NextApiRequest, type NextApiResponse } from "next";
import { z } from "zod";
import bycrypt from "bcrypt";
import { type User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { prisma } from "../../server/db/client";
import cookie from "cookie";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
  }
  const { username, password } = req.body;

  const checkUserData = loginSchema.safeParse({ username, password });
  if (!checkUserData.success) {
    return res.status(400).json({ error: "Please Enter all required fields." });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isPasswordCorrect = await bycrypt.compare(
    password,
    (user as User).password
  );

  if (!isPasswordCorrect) {
    res.status(400).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      username: (user as User).username,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30d",
    }
  );

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    })
  );

  res.status(200).json({ message: "Login successful" });
};

export default Login;
