import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
// import { finalUniversityData } from "../../constants/data";
import bycrypt from "bcrypt";

const Seed = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    await prisma.user.deleteMany();
    // finalUniversityData.map(async (university) => {
    //   const { name, username, password } = university;
    //   const hashedPassword = await bycrypt.hash(password, 10);
    //   await prisma.user.create({
    //     data: {
    //       name,
    //       username,
    //       password: hashedPassword,
    //     },
    //   });
    // });
    return res.status(200).json({ message: `Seeded all user` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export default Seed;
