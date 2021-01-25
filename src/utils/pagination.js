
/**
 * Description. pagination utils
 * @param {integer} page of pagination.
 * @param {integer} limit of pagination.
 * @returns {object} return skip, page of pagination
 */

module.exports.paginate = (page,limit) => {
    page  = Number(page) || 1;
    limit = Number(limit) || 10;
    const skip= (page - 1 ) * limit;
    return {
        skip, 
        limit
    };
};
  