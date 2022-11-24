import { type NextApiRequest, type NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: "ap-south-1",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: "v4",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

const Seed = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, type } = req.body;

    const fileParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: name,
      Expires: 600,
      ContentType: type,
      ACL: "public-read",
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);
    res.status(200).json({ url });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export default Seed;
