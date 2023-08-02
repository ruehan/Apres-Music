const apiKey = process.env.API_KEY

export default async function handler(req, res) {

    const { artist, song, description, genre } = req.body;

    console.log(artist, song, description, genre)

    // res.json(artistData)
}