export default function handler(req, res) {

  const { gender, id } = req.query;

  let folder = "all";
  let avatarId;

  if (gender === "boy") {
    folder = "boy";
    avatarId = Math.floor(Math.random() * 50) + 1; // 1-50
  }

  else if (gender === "girl") {
    folder = "girl";
    avatarId = Math.floor(Math.random() * 50) + 51; // 51-100
  }

  else {
    avatarId = Math.floor(Math.random() * 100) + 1;
  }

  if (id) avatarId = id;

  const url = `/avatars/${folder}/AV${avatarId}.png`;

  res.writeHead(302, { Location: url });
  res.end();
}