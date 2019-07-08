const express = require('express')
const axios = require('axios')
const router = express.Router()
const locations = require('../helpers/locations')
const calculateResponse = require('../helpers/methods').calculateResponse;


async function getData(res, segments) {
  let leaderboards = await calculateResponse(segments);
  leaderboards = leaderboards.filter(x => {
    return x.count > 1
  })
  res.status(200).send(leaderboards);
  return leaderboards;
}

router.get('/explore', (req, res) => {
  const istanbul = locations.istanbul
  const {
    latitude_southWest,
    longitude_southWest,
    latitude_northEast,
    longitude_northEast
  } = istanbul

  axios.defaults.headers.common = {
    Authorization: `Bearer f3274afb2f45990602e2f656d47c783aac613bba`
  }
  
  let leaderboards = [];

  axios.get(`https://www.strava.com/api/v3/segments/explore?bounds=${latitude_southWest},${longitude_southWest},${latitude_northEast},${longitude_northEast}`).then(data => {
    let segments = data.data.segments.sort((a, b) => {
      return b.avg_grade - a.avg_grade
    }).slice(0, 10);

    leaderboards = getData(res, segments);
  });
});

module.exports = router;
