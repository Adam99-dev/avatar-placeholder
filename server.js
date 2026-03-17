const express = require("express");
const app = express();

// serve static files
app.use(express.static("public"));


// 🔥 RANDOM AVATAR
app.get("/api/avatars", (req, res) => {
    let { gender } = req.query;

    let min = 1, max = 100, folder = "all";

    if (gender === "boy" || gender === "male") {
        min = 1;
        max = 50;
        folder = "boy";
    } 
    else if (gender === "girl" || gender === "female") {
        min = 51;
        max = 100;
        folder = "girl";
    }

    const id = Math.floor(Math.random() * (max - min + 1)) + min;

    res.set("Cache-Control", "no-store");
    res.redirect(`/avatars/${folder}/AV${id}.png?t=${Date.now()}`);
});


// 🔥 FIXED AVATAR (BASED ON ID)
app.get("/api/avatars/:id", (req, res) => {
    let { id } = req.params;
    let { gender } = req.query;

    id = parseInt(id);

    if (isNaN(id) || id <= 0) id = 1;

    let min = 1, max = 100, folder = "all";

    if (gender === "boy" || gender === "male") {
        min = 1;
        max = 50;
        folder = "boy";
    } 
    else if (gender === "girl" || gender === "female") {
        min = 51;
        max = 100;
        folder = "girl";
    }

    // keep id inside range
    const finalId = ((id - min) % (max - min + 1)) + min;

    res.set("Cache-Control", "no-store");
    res.redirect(`/avatars/${folder}/AV${finalId}.png?t=${Date.now()}`);
});


// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});