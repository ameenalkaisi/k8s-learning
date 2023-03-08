// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

interface UserCreateRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
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

  await prisma.user.create({
    data: {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    },
  });

  res.status(200).json("success");
}
