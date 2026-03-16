import fs from "fs";
import path from "path";

export default function handler(req, res) {

  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const gender = searchParams.get("gender");

  let folder = "avatars/all";

  if (gender === "boy") {
    folder = "avatars/boy";
  }

  if (gender === "girl") {
    folder = "avatars/girl";
  }

  const dir = path.join(process.cwd(), folder);

  const files = fs.readdirSync(dir);

  const random = files[Math.floor(Math.random() * files.length)];

  const imagePath = path.join(dir, random);

  const image = fs.readFileSync(imagePath);

  res.setHeader("Content-Type", "image/png");

  res.status(200).send(image);
}