// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";

type Data = {
  users: User[];
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();

  if(!prisma) {
    console.log("noo");
  }

  const users = await prisma.user.findMany();
  res.status(200).json({ users: users });
}
