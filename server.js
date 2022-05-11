const dotenv = require("dotenv");
const express = require("express");
const path = require("path");

// import {fileURLToPath} from 'url';

// const filename = fileURLToPath(import.meta.url);

// // 👇️ "/home/john/Desktop/javascript"
// const dirname = path.dirname(filename);
// initialize configuration
dotenv.config();

// as if it were an environment variable
const port = process.env.SERVER_PORT || 3000;

const app = express();

// const rootDir = path.join(__dirname);

app.use("/", express.static(__dirname + "/public"));

// define a route handler for the default home page
app.get("/", (req, res) => {
    // render the index template
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
});