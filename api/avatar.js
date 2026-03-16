import fs from "fs";
import path from "path";

export default function handler(req, res) {

  const { gender, id } = req.query;

  let folder = "all";

  if (gender === "boy") folder = "boy";
  if (gender === "girl") folder = "girl";

  const avatarFolder = path.join(process.cwd(), "avatars", folder);
  const files = fs.readdirSync(avatarFolder);

  let file;

  if (id) {
    file = `${id}.png`;
  } else {
    file = files[Math.floor(Math.random() * files.length)];
  }

  const filePath = path.join(avatarFolder, file);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Avatar not found");
  }

  const img = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "image/png");
  res.send(img);
}