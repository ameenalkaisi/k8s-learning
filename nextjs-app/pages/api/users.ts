// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

interface UserCreateRequest extends NextApiRequest {
  body: {
    name: string;
    email: string;
  };
}

export default async function handler(
  req: UserCreateRequest,
  res: NextApiResponse<string>
) {
  const prisma = new PrismaClient();

  if (!prisma) {
    console.log("noo");
  }

  console.log(req.body.name);
  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
    },
  });

  res.status(200).json("success");
}
