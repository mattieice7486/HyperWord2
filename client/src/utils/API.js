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
    doesDefinitionExist: function (word) { //see if it returns a definition
        return axios.get("https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word, headers)
            .then(function (data) {
                // Return true if we get a 200 response from Oxford
                return true;
            })
            .catch(function (response, error) {
                // Return false if we get a 404 response from Oxford
                return false;
            });
    }
};