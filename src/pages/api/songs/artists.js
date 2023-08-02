
const apiKey = process.env.API_KEY

export default async function handler(req, res) {
    const { artist } = req.body;

    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&api_key=${apiKey}&format=json`)
    const artistData = await response.json()

    res.json(artistData)
}