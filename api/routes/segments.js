const express = require("express");
const axios = require("axios");
const router = express.Router();
const locations = require("../helpers/locations");

router.get("/explore", (req, res) => {
  const istanbul = locations.istanbul;
  const { latitude_southWest, longitude_southWest, latitude_northEast, longitude_northEast } = istanbul;

  axios.defaults.headers.common = {'Authorization': `Bearer e0734dbcb520aee3b76a61fd1a794682f7d44ceb`}

  axios.get(`https://www.strava.com/api/v3/segments/explore?bounds=${latitude_southWest},${longitude_southWest},${latitude_northEast},${longitude_northEast}`).then(data => {
    const responseData = data.data
    res.status(200).send(responseData)
  })
})

module.exports = router;