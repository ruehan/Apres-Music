
import { PrismaClient } from "@prisma/client";
import withSession from "../../../utils/session";

const prisma = new PrismaClient();

export default withSession(async (req, res) => {

    const data = req.body;

    const user = req.session.get("user");

    const songData = await prisma.share.findMany({
        where: {
            id: Number(data.id),
            name: user.name
        }
    })

    console.log(songData)

    if(songData){
        await prisma.like.deleteMany({
            where: {
                songId : Number(data.id)
            }
        })

        await prisma.share.delete({
            where: {
                id: Number(data.id)
            }
        })
    }

})