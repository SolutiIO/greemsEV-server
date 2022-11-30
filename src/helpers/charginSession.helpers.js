const _spilt = require("lodash/split");
const _parseInt = require("lodash/parseInt");

const getTimeStamp = (str) => {
  const arr = _spilt(str, " ");
  const dateString = arr[0];
  const timeString = arr[1];
  const timeArr = _spilt(timeString, ":");
  const date = _parseInt(dateString[0] + dateString[1]);
  const month = _parseInt(dateString[2] + dateString[3]);
  const year = _parseInt(
    dateString[4] + dateString[5] + dateString[6] + dateString[7]
  );
  const hour = _parseInt(timeArr[0]);
  const minutes = _parseInt(timeArr[1]);
  const dateObj = new Date(year, month - 1, date, hour, minutes);
  return dateObj.getTime();
};

module.exports = {
  getTimeStamp,
};
