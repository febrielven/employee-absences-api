
/**
 * Description. Error message API
 * @return {string} Return error message.
 */
module.exports.errorMsg = {
    errlatlogitude: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
    errRiderName: 'Rider name must be a non empty string',
    errDriverName: 'Driver name must be a non empty string',
    errDriverVehicle: 'driver vehicle must be a non empty string',
    errChartLength: 'Character length must be between 2 and 50',
    errRides: 'Could not find any rides',
    errUnknown: 'Unknown error',
    errInteger: 'Must be integer and larger than 0',
    errLimit: 'The limit must be 1, 5, 10, 20, or 50'
};