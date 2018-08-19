import axios from "axios";
//import Dictionary from "oxford-dictionary-api";

//need to insert key and ID into header
//use postman to test

export default {

    doesDefinitionExist: function(word) { //see if it returns a definition
        return axios.get("https://wordsapiv1.p.mashape.com/words/" + word, {
            headers: {
                "X-Mashape-Key": "745ec98a-e6e0-4ae7-8ccc-b0534980e177",
                'Access-Control-Allow-Origin': 'http://localhost',
            }
        }
    )
    }

    

};