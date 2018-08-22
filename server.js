const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
//const routes = require("./routes");
const app = express();
const {doesDefinitionExist} = require("./client/src/utils/API.js");

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Allow CORS since our client is on a different origin
app.use(function(request, response, next) {
	response.header('Access-Control-Allow-Origin', '*');
	response.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    // app.use(express.static("/"));
      app.use(express.static("client/build"));
}


// // Define API routes here
// app.get("/api/words", (req, res) => { //need to call this at some point????????????????????
//     console.log(req);
// });

app.post("/api/check-word", async (req, res) => {
    try {
        const isWord = await doesDefinitionExist(req.body.guess);
        console.log("is it a word?" + isWord);
        return res.send("its a word yo");
    } catch(error) {
        return res.send("its not a word").status(404);
    }
});


// // Send every other request to the React app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// app.get("/game", (req, res) => {
//     res.sendFile(path.join(__dirname, "./client/src/pages/game.html"));
// });

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});