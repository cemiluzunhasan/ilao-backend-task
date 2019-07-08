
const searchForEntry = (arr, object) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].athlete_name == object.athlete_name) {
      return i;
    }
  }
  return -1;
};

module.exports = {
  searchForEntry
};
