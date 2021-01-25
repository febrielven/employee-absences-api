const { check, query, param } = require('express-validator');
const errorMsg = require('./errorMsg').errorMsg;

/**
 * BEGIN validation object
 * @return {Object} Return validation required for API.
 */
module.exports.validate= {
    postRide: [
        check(['start_lat', 'end_lat'])
            .isFloat({ min: -90, max: 90 })
            .withMessage(errorMsg.errlatlogitude),

        check(['start_long', 'end_long'])
            .isFloat({ min: -180, max: 180 })
            .withMessage(errorMsg.errlatlogitude),
           
        check(['rider_name'])
            .matches('^[a-zA-Z ]+$').withMessage(errorMsg.errRiderName)
            .isLength({ min: 2, max: 50 }).withMessage(errorMsg.errChartLength),
        check(['driver_name'])
            .matches('^[a-zA-Z ]+$').withMessage(errorMsg.errDriverName)
            .isLength({ min: 2, max: 50 }).withMessage(errorMsg.errChartLength),
        check(['driver_vehicle'])
            .matches('^[a-zA-Z ]+$').withMessage(errorMsg.errDriverVehicle)
            .isLength({ min: 2, max: 50 }).withMessage(errorMsg.errChartLength)
            
    ],
    getRide: [
        query('page')
            .optional()
            .isInt({ min: 1 }).withMessage(errorMsg.errInteger),
        query('limit')
            .optional()
            .isInt().withMessage('Must be integer')
            .isIn([1, 5, 10, 20, 50]).withMessage(errorMsg.errLimit)
    ],
    getRideByID: [
        param('id')
            .isInt({ min: 1 }).withMessage(errorMsg.errorInteger)
    ]
};
