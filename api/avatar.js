import fs from "fs";
import path from "path";

export default function handler(req, res) {

  const { id } = req.query;

  const imagePath = path.join(process.cwd(), "avatars/all", `${id}.png`);

  if (!fs.existsSync(imagePath)) {
    return res.status(404).send("Avatar not found");
  }

  const image = fs.readFileSync(imagePath);

  res.setHeader("Content-Type", "image/png");
  res.send(image);
}