/* eslint-disable no-undef */

module.exports = {

    /**
         * @description func Query getAll of rides
         * @param {integer} skip of pagination
         * @param {integer} page of pagination
         * @param {db} connect database sqlite3
         * @returns {Array[]} return array list rides
    */
    getAll: (skip, limit, db) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM Rides ORDER BY rideID ASC LIMIT ? OFFSET ?',limit,skip, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    },

    /**
     * @description func Query findByID of rides
     * @param {integer} rideID of rides
     * @param {db} connect database sqlite3
     * @returns {Array[]} return array list rides
    */
    findByID: async (rideID, db) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM Rides WHERE rideID=?',rideID, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    },


    /**
     * @description func Query save rides
     * @param {Array[]} args The list of rides Object
     * @param {integer} data.start_lat The start latitude
     * @param {integer} data.start_long The start longitude
     * @param {integer} data.end_lat The end latitude
     * @param {integer} data.end_long The end longitude
     * @param {string}  data.rider_name The rider name
     * @param {string}  data.driver_name The driver name
     * @param {string}  data.driver_vehicle The vehicle type
     * @param {db} connect database sqlite3
     * @returns {Object{}}  Object lastID 
    */
    save: async(args, db) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.run(query, args, function(err) {
                if (err) {
                    reject(err);
                }
                resolve({
                    lastID: this.lastID,
                });
            });
        });
    },
};