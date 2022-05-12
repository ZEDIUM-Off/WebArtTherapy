const dotenv = require("dotenv");
const express = require("express");
const path = require("path");

dotenv.config();

const port = process.env.SERVER_PORT || 3000;

const app = express();

app.use("/", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/pages/index.html"));
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
});