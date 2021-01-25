
/**
 * Description. Handle Error API
 * @param {integer} error_code code of error.
 * @param {string} errorMsg message of error message.
 * @returns {object} return handle error API
 */

module.exports.getDateString =  (date) => {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    return year + "-" + month + "-" + day;
};
  