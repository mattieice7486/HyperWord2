import axios from "axios";
// import unirest from "unirest";
//import Dictionary from "oxford-dictionary-api";

//need to insert key and ID into header
//use postman to test


// const RapidAPI = require('rapidapi-connect');
// const rapid = new RapidAPI('hyperword2_5b79d912e4b070c2fc657380', '3a8694f1-919c-4dda-9ba9-941cf1544d42');


export default {

    doesDefinitionExist: function(word) { //see if it returns a definition

        return axios.get("https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word, {
            "headers": { ///////////////
                "app_id": "0a036353",
                "app_key": "d095c3cae77b50f576eea84cd7d7c6c6",
                "Allow-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials' : 'true',
                'Access-Control-Allow-Origin': 'http://localhost',
                'Access-Control-Allow-Origins': 'http://localhost',
                'Content-Type': 'application/json',
                'Accept-Charset' : 'utf-8' 
            }
        }
        )

        // return unirest.get("https://wordsapiv1.p.mashape.com/words/" + word)
        // .header("X-Mashape-Key", "8JuhiE3Y6KmshrbzdUvl45rBJ9zDp1DLlKyjsnmyNDN01gDuIf");
    //     return axios.get("https://wordsapiv1.p.mashape.com/words/" + word, {
    //         headers: {
    //             "X-Mashape-Key": "8JuhiE3Y6KmshrbzdUvl45rBJ9zDp1DLlKyjsnmyNDN01gDuIf",
    //             "X-Mashape-Host": "wordsapiv1.p.mashape.com"
    //         }
    //     }
    // )

    }
  

};


//pEdyxcBMz3msh6axxLsYbXGpkCoEp18RuBKjsnjJsVptbYQR3M





    // wordSearch: function() { //loop through whole dictionary
    //     return axios.get("https://od-api.oxforddictionaries.com/api/v1/entries/en/word", {
    //         headers: {
    //             app_id: "0a036353",
    //             app_key: "d095c3cae77b50f576eea84cd7d7c6c6"
    //         }    
    //     }
    //     );
    // },
    // doesDefinitionExist: function(word) { //see if it returns a definition
    //   return axios.get("https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word, {
    //     headers: {
    //         app_id: "0a036353",
    //         app_key: "d095c3cae77b50f576eea84cd7d7c6c6",
    //         "Access-Control-Allow-Origin": "*",
    //         "Allow-Control-Allow-Origin": "*",
    //         'Access-Control-Allow-Credentials' : 'true',
    //         'Access-Control-Allow-Origin': 'http://localhost',
    //         'Access-Control-Allow-Origins': 'http://localhost',
    //         'Content-Type': 'application/json' 
    //     }    
    // }
    // );
    // } // ^ NEED TO ADD API_KEY AND USER ID!!!!!!!!!!!!!!!!!!!!!!!!!!
    //but if there's no definition returned, what IS returned???
    //pass in app key and id



// export default {

//assign as objects
// const API = () => {

//   var app_id = "0a036353";
//   var app_key = "d095c3cae77b50f576eea84cd7d7c6c6";
  
//   var dict = new Dictionary(app_id, app_key);

//   dict.find("ace",function(error, data){
//     if(error) {
//         return console.log(error);
//         console.log(data);
//     }
//   });

// }  
// }

// export default API;

//word: results.id; POS: results.lexicalEntries.lexicalCategory


// const Words = [
//     {
//         word: "",
//         partOfSpeech: "noun"
//     },
//     {
//         word: "",
//         partOfSpeech: "adjective"
//     },
//     {
//         word: "",
//         partOfSpeech: "verb"
//     }
// ];

// export default Words;