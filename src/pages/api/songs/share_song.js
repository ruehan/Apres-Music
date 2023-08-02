const apiKey = '6887471e68c1280f33d5882bc1d790d4'

export default async function handler(req, res) {

    const { artist, song, description, genre } = req.body;

    console.log(artist, song, description, genre)

    // res.json(artistData)
}