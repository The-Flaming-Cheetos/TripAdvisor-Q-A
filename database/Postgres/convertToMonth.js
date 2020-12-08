module.exports.convertToMonth = (month) => {
  if (Number(month) === 1) {
    return "Jan";
  } else if (Number(month) === 2) {
    return "Feb";
  } else if (Number(month) === 3) {
    return "Mar";
  } else if (Number(month) === 4) {
    return "Apr";
  } else if (Number(month) === 5) {
    return "May";
  } else if (Number(month) === 6) {
    return "Jun";
  } else if (Number(month) === 7) {
    return "Jul";
  } else if (Number(month) === 8) {
    return "Aug";
  } else if (Number(month) === 9) {
    return "Sep";
  } else if (Number(month) === 10) {
    return "Oct";
  } else if (Number(month) === 11) {
    return "Nov";
  } else {
    return "Dec";
  }
}