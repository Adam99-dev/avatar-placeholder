export default function handler(req, res) {

  const { gender, id } = req.query;

  let folder = "all";

  if (gender === "boy") folder = "boy";
  if (gender === "girl") folder = "girl";

  const max = 10; // number of images in each folder

  const avatarId = id || Math.floor(Math.random() * max) + 1;

  const url = `/avatars/${folder}/AV${avatarId}.png`;

  res.writeHead(302, {
    Location: url
  });

  res.end();
}