

export default async function handler(req, res) {
    const { songName } = req.body;

    var convert = require("xml-js")

    const response = await fetch(`https://www.maniadb.com/api/search/${songName}/?sr=song&display=10&key=example&v=0.5`)
    
    const xmlString = await response.text()

    var xmlToJson = convert.xml2json(xmlString, {compact: true}).replaceAll("", "")

    var xmlToJson = JSON.parse(xmlToJson.replaceAll("maniadb:", ""))
    
    res.status(200).json(xmlToJson);

    // res.json(artistData)
}