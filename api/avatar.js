export default function handler(req, res) {

  const { gender, id } = req.query;

  let avatarId;

  if (id) {
    avatarId = id;
  } 
  else if (gender === "boy") {
    avatarId = Math.floor(Math.random() * 50) + 1;      // 1-50
  } 
  else if (gender === "girl") {
    avatarId = Math.floor(Math.random() * 50) + 51;     // 51-100
  } 
  else {
    avatarId = Math.floor(Math.random() * 100) + 1;     // 1-100
  }

  const url = `/avatars/AV${avatarId}.png`;

  res.writeHead(302, {
    Location: url
  });

  res.end();
}