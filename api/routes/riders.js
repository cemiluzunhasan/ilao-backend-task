const express = require('express')
const axios = require('axios')

const locations = require('../helpers/locations');
const { getRiders } = require('../controllers/riders');
const { ACCESS_TOKEN, BASE_ADDRESS } = require("../helpers/constants");

const router = express.Router();

async function getData(res, segments) {
  let leaderboards = await getRiders(segments);
  leaderboards = leaderboards.filter(x => {
    return x.count > 1
  })
  res.status(200).send(leaderboards);
  return leaderboards;
}

router.get('/', (req, res) => {
  const istanbul = locations.istanbul
  const {
    latitude_southWest,
    longitude_southWest,
    latitude_northEast,
    longitude_northEast
  } = istanbul;

  axios.defaults.headers.common = {
    Authorization: `Bearer ${ACCESS_TOKEN}`
  }

  axios.get(`${BASE_ADDRESS}/segments/explore?bounds=${latitude_southWest},${longitude_southWest},${latitude_northEast},${longitude_northEast}`).then(data => {
    let segments = data.data.segments.sort((a, b) => {
      return b.avg_grade - a.avg_grade
    }).slice(0, 10);

    getData(res, segments);
  });
});

module.exports = router;
