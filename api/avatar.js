export default function handler(req, res) {
  const { gender, id } = req.query;

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
    avatarId = Number(id);
    if (isNaN(avatarId) || avatarId < min || avatarId > max) {
      avatarId = Math.floor(Math.random() * (max - min + 1)) + min;
    }
  } else {
    // Random + session-based fix (cookie)
    const cookieName = `rnd_av_${folder}`;
    let saved = req.cookies?.[cookieName];

    if (saved && !isNaN(saved)) {
      avatarId = Number(saved);
    } else {
      avatarId = Math.floor(Math.random() * (max - min + 1)) + min;
      res.setHeader(
        'Set-Cookie',
        `${cookieName}=${avatarId}; Path=/; Max-Age=31536000; SameSite=Lax`
      );
    }
  }

  const file = `/avatars/${folder}/AV${String(avatarId).padStart(2, '0')}.png`;

  // Super strict no-cache headers (Vercel/Cloudflare ke liye bhi)
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  // Extra: browser ko force karo fresh fetch karne ke liye
  res.setHeader('Surrogate-Control', 'no-store'); // Cloudflare ke liye

  res.writeHead(302, { Location: file });
  res.end();
}