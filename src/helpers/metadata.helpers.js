const _reduce = require("lodash/reduce");
const _isEmpty = require("lodash/isEmpty");
const _get = require("lodash/get");

const getFormattedMetadata = (vehicles) => {
  return _reduce(
    vehicles,
    (res, item = {}) => {
      const { make } = item;
      if (_isEmpty(make)) return res;
      const previousData = _get(res, make, []);
      return {
        ...res,
        [make]: [...previousData, item.model],
      };
    },
    {}
  );
};

module.exports = {
  getFormattedMetadata,
};
