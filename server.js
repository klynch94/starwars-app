const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const characters = [
    {
        name: "Yoda",
        role: "Jedi Master",
        age: 900,
        forcePoints: 2000,
        routeName: "yoda"
    },
    {
        name: "Darthmaul",
        role: "Sith Lord",
        age: 340,
        forcePoints: 1200,
        routeName: "darthmaul"
    },
    {
        name: "Obiwan",
        role: "Jedi Master",
        age: 199,
        forcePoints: 930,
        routeName: "obiwan"
    }
]

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get("/add", (req, res) => {
    res.sendFile(path.join(__dirname, 'add.html'));
})

app.get("/api/characters", (req, res) => {
    res.json(characters);
})

app.get("/api/characters/:character", (req, res) => {
    const chosen = req.params.character;
    console.log(chosen);

    for(let i = 0; i<characters.length; i++) {
        if(chosen === characters[i].routeName) {
            res.json(characters[i]);
        }
    }
    res.json(false);
})

app.post("/api/characters", (req, res) => {
    const newCharacterData = req.body
    newCharacterData.routeName = newCharacterData.name.replace(/\s+/g, '').toLowerCase()
    characters.push(newCharacterData);
    res.json(newCharacterData);
})

app.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`);
})