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


function doesPOSMatch (partOfSpeech, word) {
    // return axios.get("https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word, headers)
    return axios.get("https://od-api.oxforddictionaries.com/api/v1/entries/en/wire", headers)
        .then(function(data) {
            
            var count = 0;
            var wordResults = data.data.results[0].lexicalEntries;
            
            for (var i=0; i<wordResults.length; i++) {
                
                //console.log("this: " + wordResults[i].lexicalCategory)
                //console.log("random: " + partOfSpeech)
                if (wordResults[i].lexicalCategory === partOfSpeech) {
                    count++;
                    //return;
                    //console.log("correct POS! Count is " + count)
                }
                //console.log(count)
            }
            //console.log(count)
            if (count > 0) {
                return true;
            } else {
                return false;
            }
        })
        .catch(function (response, error) {
            // Return false if we get a 404 response from Oxford
            return false;
        });
}


module.exports = {

    doesDefinitionExist: function(word, partOfSpeech) { //see if it returns a definition
        return axios.get("https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word, headers)
            .then(function(data) {
                // Return true if we get a 200 response from Oxford *AND* POS MATCHES
                console.log("does it match?" + doesPOSMatch(partOfSpeech));
                if (doesPOSMatch(partOfSpeech) == true) {
                    return true;
                }
                else if (doesPOSMatch(partOfSpeech) == false) {
                    return false;
                }
            })
            .catch(function (response, error) {
                return false;
            });
    }

}