exports.compareDate = void 0;

var compareDate = function compareDate(firstDate, secondDate) {
  return new Date(secondDate) - new Date(firstDate);
};

exports.compareDate = compareDate;