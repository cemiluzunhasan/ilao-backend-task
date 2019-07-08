const axios = require("axios");

const searchForEntry = (arr, object) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].athlete_name == object.athlete_name) {
      return i;
    }
  }
  return -1;
};

async function calculateResponse(segments) {
  let leaderboards = [];

  for (let i = 0; i < segments.length; i++) {
    let res = await axios.get(`https://www.strava.com/api/v3/segments/${segments[i].id}/leaderboard`);
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
}

module.exports = {
  searchForEntry,
  calculateResponse
};
