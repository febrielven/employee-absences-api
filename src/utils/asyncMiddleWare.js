const db = require('../../db/config');
/**
 * Description. change db.all function into Promised based function
 * @param {string} qStr query String.
 * @return Promise Object
 */
module.exports.DBquery = (qStr) => {
    return new Promise((resolve, reject) => {
        db.query(qStr.query, [qStr.args], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};


module.exports.DBQueryOne = (qStr) => {
    return new Promise((resolve, reject) => {
        db.query(qStr.query, qStr.args, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};
