
/**
 * Description. Handle Error API
 * @param {integer} error_code code of error.
 * @param {string} errorMsg message of error message.
 * @returns {object} return handle error API
 */

module.exports.handleError =  (error_code, errorMsg) => {
    const handle =  {
        error_code: error_code,
        message: errorMsg,
    };
    return handle;
};
  