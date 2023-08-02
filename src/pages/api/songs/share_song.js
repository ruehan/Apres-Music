const apiKey = process.env.API_KEY

import { PrismaClient } from "@prisma/client";
import withSession from "../../../utils/session";

const prisma = new PrismaClient();

export default withSession(async (req, res) => {

    const user = req.session.get("user");

    console.log(user)

    const { artist, songName, description, genre } = req.body;

    const genreArray = genre.split('#')

    genreArray.shift()


    const share = await prisma.share.create({
        data: {
            artist: artist,
            song: songName,
            description: description,
            genre: genreArray.toString(),
            name: user.name,
            url: ""
        }
    })

    res.status(200).json(share);

})