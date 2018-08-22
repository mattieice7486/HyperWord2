const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
//const routes = require("./routes");
const app = express();
const { doesDefinitionExist } = require("./client/src/utils/API.js");

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Allow CORS since our client is on a different origin
app.use(function (request, response, next) {
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


// Route to check if the user input is a word
app.post("/api/check-word", function (req, res) {
    doesDefinitionExist(req.body.guess, req.body.POS)
        .then(function (isWord) {
            if (isWord === true) {
                return res.send("it's a word");
            }
            else {
                //console.log('nope!') //ok
                return res.send("it's not a word");
            }
        })
        .catch(function (error) {
            return res.send(error).status(400);
        })
});


// Send every other request to the React app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});