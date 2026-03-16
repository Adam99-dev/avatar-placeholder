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

  // Agar user ne specific ID diya hai → usi ko priority do
  if (id) {
    avatarId = Number(id); // safety ke liye Number mein convert
    // range check (optional but achha practice)
    if (avatarId < min || avatarId > max) {
      avatarId = Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
  // Random mode
  else {
    // Cookie se pehle se random id mili hai?
    const cookieName = `randomAvatar_${folder}`;
    const cookieValue = req.cookies?.[cookieName];

    if (cookieValue && !isNaN(cookieValue)) {
      avatarId = Number(cookieValue);
    } else {
      // Naya random banao aur cookie mein save kar do
      avatarId = Math.floor(Math.random() * (max - min + 1)) + min;

      // Cookie set kar rahe hain (1 saal tak ya session ke liye)
      res.setHeader(
        "Set-Cookie",
        `${cookieName}=${avatarId}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax`
      );
    }
  }

  const url = `/avatars/${folder}/AV${String(avatarId).padStart(2, "0")}.png`;

  res.writeHead(302, {
    Location: url,
    "Cache-Control": "public, max-age=3600", // ab thoda cache allowed hai
  });

  res.end();
}