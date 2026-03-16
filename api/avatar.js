export default function handler(req, res) {

  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const gender = searchParams.get("gender")?.toLowerCase();

  let folder = "all";
  let max = 100;

  if (gender === "boy") {
    folder = "boy";
    max = 50;
  }

  if (gender === "girl") {
    folder = "girl";
    max = 50;
  }

  const random = Math.floor(Math.random() * max) + 1;

  res.redirect(`/avatars/${folder}/${random}.png`);
}