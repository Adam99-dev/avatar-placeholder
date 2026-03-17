const express = require("express");
const app = express();

// serve static files (VERY IMPORTANT)
app.use(express.static("public"));

/*
📌 CONFIG
Change these if you add more avatars later
*/
const CONFIG = {
    total: 100,
    male: { min: 1, max: 50, folder: "boy" },
    female: { min: 51, max: 100, folder: "girl" },
    all: { min: 1, max: 100, folder: "all" }
};


// 🔹 helper: get config based on gender
function getConfig(gender) {
    if (gender === "male") return CONFIG.male;
    if (gender === "female") return CONFIG.female;
    return CONFIG.all;
}


// 🔥 1. RANDOM AVATAR (FOR SIGNUP BUTTON)
app.get("/api/avatars/random", (req, res) => {
    const gender = req.query.gender;
    const { min, max, folder } = getConfig(gender);

    const num = Math.floor(Math.random() * (max - min + 1)) + min;

    const avatarUrl = `/avatars/${folder}/AV${num}.png`;

    // prevent caching (important for random)
    res.set("Cache-Control", "no-store");

    res.json({
        avatar: avatarUrl
    });
});


// 🔥 2. DETERMINISTIC AVATAR (OPTIONAL BACKUP)
app.get("/api/avatars/generate/:id", (req, res) => {
    const { id } = req.params;
    const gender = req.query.gender;

    const { min, max, folder } = getConfig(gender);

    // simple hash
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }

    const num = (Math.abs(hash) % (max - min + 1)) + min;

    const avatarUrl = `/avatars/${folder}/AV${num}.png`;

    res.json({
        avatar: avatarUrl
    });
});


// 🔥 3. OPTIONAL: DIRECT IMAGE VIEW (BROWSER)
app.get("/api/avatars/view/random", (req, res) => {
    const { min, max, folder } = CONFIG.all;

    const num = Math.floor(Math.random() * (max - min + 1)) + min;

    res.redirect(`/avatars/${folder}/AV${num}.png`);
});


// 🔹 start server (local)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});