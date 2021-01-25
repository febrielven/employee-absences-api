
/**
 * Description. Generate randow number
 * @return {integer} Return random number.
 */

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

module.exports.random = randomNumber;