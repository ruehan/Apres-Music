const apiKey = process.env.API_KEY

import { PrismaClient } from "@prisma/client";
import withSession from "../../../utils/session";

const prisma = new PrismaClient();

export default withSession(async (req, res) => {

    const id = Number(req.body.id)

    const user = req.session.get("user");

    const likes = await prisma.like.findMany({
        where: {
            name: user.name,
            songId: id
        }
    })

    const changeLike = await prisma.like.update({
        where: {
            id: likes[0].id,
            name: user.name
        },
        data: {
            isLiked: !likes[0].isLiked
        }
    })

    console.log(changeLike)

    // res.status(200).json(likes);

})