import axios from "axios";
import Dictionary from "oxford-dictionary-api";

//need to insert key and ID into header
//use postman to test

export default {
    // wordSearch: function() { //loop through whole dictionary
    //     return axios.get("https://od-api.oxforddictionaries.com/api/v1/entries/en/word", {
    //         headers: {
    //             app_id: "0a036353",
    //             app_key: "d095c3cae77b50f576eea84cd7d7c6c6"
    //         }    
    //     }
    //     );
    // },
    doesDefinitionExist: function(word) { //see if it returns a definition
      return axios.get("https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word, {
        headers: {
            app_id: "0a036353",
            app_key: "d095c3cae77b50f576eea84cd7d7c6c6",
            "Access-Control-Allow-Origin": "*",
            "Allow-Control-Allow-Origin": "*",
            'Access-Control-Allow-Credentials' : 'true',
            'Access-Control-Allow-Origin': 'http://localhost',
            'Access-Control-Allow-Origins': 'http://localhost',
            'Content-Type': 'application/json' 
        }    
    }
    );
    } // ^ NEED TO ADD API_KEY AND USER ID!!!!!!!!!!!!!!!!!!!!!!!!!!
    //but if there's no definition returned, what IS returned???
    //pass in app key and id
};


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