import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const Seed = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { body } = req;

    console.log(body);
    res.json({ message: "Success", body });

    const { id } = await prisma.userResponse.create({
      data: body,
    });
    res.status(200).json({ id });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export default Seed;
