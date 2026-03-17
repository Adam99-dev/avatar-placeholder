const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static("public"));

// read folders
const boys = fs.readdirSync("./public/avatars/boy").map(f => "boy/" + f);
const girls = fs.readdirSync("./public/avatars/girl").map(f => "girl/" + f);
const all = fs.readdirSync("./public/avatars/all").map(f => "all/" + f);


// helper function
function getFolder(gender) {
    if (gender === "male") return boys;
    if (gender === "female") return girls;
    return all; // default
}


// 🔹 RANDOM WITH GENDER
app.get("/api/avatars/:gender/random", (req, res) => {
    const gender = req.params.gender.toLowerCase();
    const list = getFolder(gender);

    const randomAvatar = list[Math.floor(Math.random() * list.length)];
    res.sendFile(path.join(__dirname, "public/avatars", randomAvatar));
});


// 🔹 FIXED WITH GENDER + ID
app.get("/api/avatars/:gender/:id", (req, res) => {
    const gender = req.params.gender.toLowerCase();
    const id = req.params.id;

    const list = getFolder(gender);

    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % list.length;
    const avatar = list[index];

    res.sendFile(path.join(__dirname, "public/avatars", avatar));
});


// 🔹 OPTIONAL (NO GENDER → ALL)
app.get("/api/avatars/random", (req, res) => {
    const randomAvatar = all[Math.floor(Math.random() * all.length)];
    res.sendFile(path.join(__dirname, "public/avatars", randomAvatar));
});


app.listen(3000, () => console.log("Server running on port 3000"));