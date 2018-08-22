const axios = require('axios');

var headers = {
    "headers": {
        "app_id": "0a036353",
        "app_key": "d095c3cae77b50f576eea84cd7d7c6c6",
        "Allow-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': 'http://localhost',
        'Access-Control-Allow-Origins': 'http://localhost',
        'Content-Type': 'application/json'
    }
};

// HOW TO MAKE SURE IT RECOGNIZES PLURALS?????????????? //
module.exports = {
    doesDefinitionExist: function(word, partOfSpeech) { //see if it returns a definition
        return axios.get("https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word, headers)
            .then(function (data) {
                // Return true if we get a 200 response from Oxford
                var wordResults = data.data.results;
                for (var i=0; i<wordResults.length; i++) {
                    for (var x=0; x<wordResults[i].lexicalEntries.length; x++) { //loop through all possible definitions
                        var POSResults = wordResults[i].lexicalEntries[x];
                        for (var z=0; z<POSResults.lexicalCategory[z].length; z++) { //loop through all possible parts of speech
                            console.log("POS: " + POSResults.lexicalCategory[z])
                            if (POSResults.lexicalCategory[z] == partOfSpeech[0]) { //if hits correct one, return true...
                                console.log("correct POS!");                    //otherwise, keep looking!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                return true;
                                //trigger win!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            }
                            //return false;
                            //console.log("incorrect POS!")
                        } //return false;
                    };
                };
                //return true; /////////////////////////////////////////////////////////////////////////////////////
            })
            .catch(function (response, error) {
                // Return false if we get a 404 response from Oxford
                return false;
            });
    }
};