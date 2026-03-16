export default function handler(req, res) {

  const { searchParams } = new URL(req.url, `http://${req.headers.host}`)

  const gender = searchParams.get("gender")

  let folder = "all"

  if (gender === "boy") folder = "boy"
  if (gender === "girl") folder = "girl"

  const max = 50   // kitni images hain
  const random = Math.floor(Math.random() * max) + 1

  const image = `/avatars/${folder}/${random}.png`

  res.redirect(image)
}