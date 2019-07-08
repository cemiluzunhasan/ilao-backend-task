const axios = require("axios");

const { BASE_ADDRESS } = require("../helpers/constants");
const { searchForEntry } = require("../helpers/methods");

async function getRiders(segments) {
  let leaderboards = [];

  for (let i = 0; i < segments.length; i++) {
    let res = await axios.get(`${BASE_ADDRESS}/segments/${segments[i].id}/leaderboard`);
    res.data.entries.map(entry => {
      let index = searchForEntry(leaderboards, entry)
      if (index != -1) {
        leaderboards[index].count += 1;
      } 
      else {
        let elementToAdd = {};
        elementToAdd.athlete_name = entry.athlete_name;
        elementToAdd.count = 1;
        leaderboards.push(elementToAdd);
      }
    })
  }
  return leaderboards;
};

module.exports = {
  getRiders
}