export default function handler(req, res) {
  const { gender, id, username } = req.query;   // username bhi support kar sakte ho future mein

  let folder = "all";
  let min = 1;
  let max = 100;

  if (gender === "boy") {
    folder = "boy";
    min = 1;
    max = 50;
  } else if (gender === "girl") {
    folder = "girl";
    min = 51;
    max = 100;
  }

  let avatarId;

  if (id) {
    // Fixed ID mode (jaise iran.liara wala)
    avatarId = Number(id);
    if (isNaN(avatarId) || avatarId < 1 || avatarId > 100) {
      avatarId = Math.floor(Math.random() * 100) + 1; // fallback
    }
  } else {
    // Pure random har baar (no cookie, taaki refresh pe hamesha naya)
    avatarId = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // File name jaise AV01.png, AV42.png etc (2 digit padding)
  const paddedId = String(avatarId).padStart(2, '0');
  const url = `/avatars/${folder}/AV${paddedId}.png`;

  // Headers jo browser/CDN ko force karte hain har baar fresh load karne ke liye
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store'); // Cloudflare/Vercel ke liye

  res.writeHead(302, { Location: url });
  res.end();
}