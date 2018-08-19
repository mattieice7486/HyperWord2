const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
//const routes = require("./routes");
const app = express();
const axios = require("axios");
const API = require("./client/src/utils/API.js");

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    // app.use(express.static("/"));
      app.use(express.static("client/build")); //????????????????????????????????
}


// Define API routes here
app.get("/api/words", (req, res) => { //need to call this at some point????????????????????
    API.doesDefinitionExist();
    console.log(res);
    //ping oxford to return json
});

// app.get("/", (req, res) => { 

// });


// // Send every other request to the React app
// app.get("/game", (req, res) => {
//     res.sendFile(path.join(__dirname, "./client/src/pages/game.html"));
// });

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});