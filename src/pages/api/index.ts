// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../interface/userLogin";

export const config = {
	api: {
		bodyParser: true,
	},
};

type Data =
	| {
			message: string;
	  }
	| {
			user: IUser;
	  };

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	switch (req.method) {
		case "POST":
			return getUsers(req, res);
		default:
			return res.status(404).json({ message: "Bad Request" });
	}
}

async function getUsers(req: NextApiRequest, res: NextApiResponse<Data>) {
	const prisma = new PrismaClient();

	await prisma.$connect();
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			mail: req.body.mail,
		},
	});

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}
	await prisma.$disconnect();
	if (user.password === req.body.password) {
		return res.status(200).json({ user });
	}

	return res.status(404).json({ message: "Bad Request" });
}
