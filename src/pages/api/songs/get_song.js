import { PrismaClient } from "@prisma/client";
import withSession from "../../../utils/session";

const prisma = new PrismaClient();

export default withSession(async (req, res) => {

    const user = req.session.get("user");

    const share = await prisma.share.findMany({
    });

    // console.log(share)

    const users = await prisma.user.findMany({

    })

    // console.log(users)



    const liked = await prisma.like.findMany({
        where: {
            name: user.name
        }
    })


    users.map(async (user) => {
        share.map(async (share) => {

            try{
                const likes = await prisma.like.findMany({
                    where: {
                        name: user.name,
                        songId: share.id
                    }
                })

                if (likes.length === 0) {
                    await prisma.like.create({
                        data: {
                            songId: share.id,
                            name: user.name,
                            artist: share.artist,
                            song: share.song,
                            genre: share.genre,
                            url: share.url,
                            isLiked: false
                        }
                    })
                }
            } catch(error) {
                console.log(error)
            }
            
    })
    })

    let data = []

    for(let i = 0; i < share.length; i++){
        const num = await prisma.like.findMany({
            where: {
                songId: share[i].id,
                isLiked: true
            }
        })

        data.push(num.length)


    }

    liked.map((like) => {
        for(let i = 0; i < share.length; i++){
            if(like.songId === share[i].id){
                share[i].isLiked = like.isLiked
                share[i].likes = data[i]
            }
        }
    })

    share.sort((a, b) => b.likes - a.likes)
    
    console.log(share)

    res.status(200).json(share);
});
