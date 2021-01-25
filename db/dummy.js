const randomNumber = require('../src/utils/randomNumber');
const driverVehicle = [
    'Avanza', 
    'Innova', 
    'Venturer',
    'Alphard',
    'Fortuner',
    'Camry',
    'Corolla',
    'Vellfire',
    'Ertiga', 
    'Expander', 
    'Honda Jazz',
    'Honda CRV',
    'Honda HRV',
    'Honda BRV'
];

const name = [
    'Budi',
    'Tono',
    'Anwar',
    'Razar',
    'Ahmand',
    'Rizal',
    'Ramli',
    'Erwin',
    'Firman',
    'Agil',
    'Anissa',
    'Fitri',
    'Yani',
    'Yuni',
    'Atri',
    'Irma',
    'Dewi',
    'Aisyah',
    'Siti'
];

/**
 * Description. Generate dummy data
 * @param {integer} count The count of dummy data generated.
 * @return {Object[]} Return rides list Object.
 */
module.exports.data = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            start_lat: randomNumber.random(-90, 90),
            start_long: randomNumber.random(-180, 180),
            end_lat: randomNumber.random(-90, 90),
            end_long: randomNumber.random(-180, 180),
            rider_name: name[randomNumber.random(0, name.length)],
            driver_name: name[randomNumber.random(0, name.length)],
            driver_vehicle: driverVehicle[randomNumber.random(0, driverVehicle.length)]
        });
    }
    return data;
};


module.exports.dummyTest = (userContext, events, done) => {
    userContext.vars.page = 1;
    userContext.vars.limit = 5;
    userContext.vars.start_lat = randomNumber.random(-90, 90);
    userContext.vars.start_long = randomNumber.random(-180, 180);
    userContext.vars.end_lat = randomNumber.random(-90, 90);
    userContext.vars.end_long = randomNumber.random(-180, 180);
    userContext.vars.rider_name =  name[randomNumber.random(0, name.length)];
    userContext.vars.driver_name = name[randomNumber.random(0, name.length)];
    userContext.vars.driver_vehicle = driverVehicle[randomNumber.random(0, driverVehicle.length)];

    return done();
};
