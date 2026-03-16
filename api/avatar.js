export default function handler(req, res) {

  const { gender, id } = req.query;

  let folder = "all";
  let min = 1;
  let max = 100;

  if (gender === "boy") {
    folder = "boy";
    min = 1;
    max = 50;
  }

  if (gender === "girl") {
    folder = "girl";
    min = 51;
    max = 100;
  }

  let avatarId;

  // If ID is given → fixed avatar
  if (id) {
    avatarId = id;
  } 
  // Otherwise random avatar
  else {
    avatarId = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const url = `/avatars/${folder}/AV${avatarId}.png`;

  res.writeHead(302, {
    Location: url,
    "Cache-Control": "no-store"
  });

  res.end();
}