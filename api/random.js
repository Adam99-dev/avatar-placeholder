import fs from "fs"
import path from "path"

export default function handler(req, res) {

  try {

    const folder = path.join(process.cwd(), "avatars/all")

    const files = fs.readdirSync(folder)

    const random = files[Math.floor(Math.random() * files.length)]

    const imagePath = path.join(folder, random)

    const image = fs.readFileSync(imagePath)

    res.setHeader("Content-Type", "image/png")

    res.status(200).send(image)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }
}