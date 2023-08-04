import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getSong(req, res){

    const share = await prisma.share.findMany({
    });

    console.log(share)

    res.status(200).json(share);
};
