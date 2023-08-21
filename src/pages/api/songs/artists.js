
const apiKey = process.env.API_KEY

export default async function handler(req, res) {
    const { artist } = req.body;

    // const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&api_key=${apiKey}&format=json`)
    // const artistData = await response.json()


    var convert = require("xml-js")

    const response = await fetch(`https://www.maniadb.com/api/search/${artist}/?sr=artist&display=20&key=example&v=0.5`)
    
    const xmlString = await response.text()

    // console.log(xmlString)

    var xmlToJson = convert.xml2json(xmlString, {compact: true}).replaceAll("", "")

    console.log(xmlToJson)

    var xmlToJson = JSON.parse(xmlToJson.replaceAll("maniadb:", ""))

    // res.json(artistData)
    res.status(200).json(xmlToJson);
}