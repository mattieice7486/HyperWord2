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

module.exports = {
    doesDefinitionExist: function(word, partOfSpeech) { //see if it returns a definition
        return axios.get("https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word, headers)
            .then(function (data) {
                // Return true if we get a 200 response from Oxford
                var wordResults = data.data.results;
                for (var i=0; i<wordResults.length; i++) {
                    for (var x=0; x<wordResults[i].lexicalEntries.length; x++) {
                        var POSResults = wordResults[i].lexicalEntries[x];
                        //console.log(POSResults.lexicalCategory); //ok
                        for (var z=0; z<POSResults.lexicalCategory[z].length; z++) {
                            if (POSResults.lexicalCategory[z] == partOfSpeech) {
                                console.log("correct POS!");
                                return true;
                            } else {
                                console.log("incorrect POS!");
                                return false;
                            }
                        }
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