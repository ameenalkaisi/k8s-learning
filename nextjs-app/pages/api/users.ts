// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { HttpStatusCode } from "axios";

interface UserCreateRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

interface UserUpdateRequest extends NextApiRequest {
  body: User;
}

async function createHandler(
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

async function updateHandler(
  req: UserUpdateRequest,
  res: NextApiResponse<string>
) {
  const prisma = new PrismaClient();

  await prisma.user.update({
    where: {
      id: req.body.id,
    },
    data: {
      name: req.body.name,
    },
  });

  res.status(HttpStatusCode.Ok).json("User updated");
}

export default async function handler(
  req: UserCreateRequest | UserUpdateRequest,
  res: NextApiResponse<string>
) {
  // todo, might need to verify requests as well
  // although that might be the reason why
  // trpc and zod exist
  switch (req.method) {
    case "POST":
      createHandler(req as UserCreateRequest, res);
      break;
    case "PUT":
      updateHandler(req as UserUpdateRequest, res);
      break;
    default:
      res.status(HttpStatusCode.BadRequest);
  }
}
