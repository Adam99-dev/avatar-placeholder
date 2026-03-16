import fs from "fs";
import path from "path";

export default function handler(req, res) {

  const folder = path.join(process.cwd(), "avatars/boy");
  const files = fs.readdirSync(folder);

  const random = files[Math.floor(Math.random() * files.length)];

  const image = fs.readFileSync(path.join(folder, random));

  res.setHeader("Content-Type", "image/png");
  res.send(image);
}