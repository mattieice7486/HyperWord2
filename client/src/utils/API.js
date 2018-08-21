import axios from "axios";
import unirest from "unirest";
//import Dictionary from "oxford-dictionary-api";

//need to insert key and ID into header
//use postman to test

export default {

    doesDefinitionExist: function(word) {
        unirest.get("https://wordsapiv1.p.mashape.com/words/" + word)
        .header("X-Mashape-Key", "4rGyLqapg6msh6rdkELFqlYwFydgp17sO62jsn3Y525iPgOulD")
        .header("X-Mashape-Host", "wordsapiv1.p.mashape.com")
        .end(function (result) {
          console.log(result.status, result.headers, result.body);
        });
    }

    

};