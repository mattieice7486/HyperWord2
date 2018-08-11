import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  getUserName: function() {
    return axios.get(
        //enter leaderboard username api html here
    );
  },
  getRoundsCompleted: function() {
    return axios.get(
        //enter leaderboard rounds completed api html here
    );
  },
  getScore: function() {
    return axios.get(
        //enter leaderboard score from api here
    );
  }
};
