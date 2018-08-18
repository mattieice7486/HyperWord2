import axios from "axios";


//Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
    wordSearch: function() { //loop through whole dictionary
      return axios.get("https://od-api.oxforddictionaries.com/api/v1/entries/english/");
    },
    doesDefinitionExist: function(word) { //see if it returns a definition
      return axios.get("https://od-api.oxforddictionaries.com/api/v1/entries/english/" + word);
    } // ^ NEED TO ADD API_KEY AND USER ID!!!!!!!!!!!!!!!!!!!!!!!!!!
};
  

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