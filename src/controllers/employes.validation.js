/**
 * Description. Error message API
 * @return {string} Return error message.
 */
const errorMsg = {
  errID: 'id tidak boleh kosong',
  errSelfie: 'image selfie tidak boleh kosong',
  errNik: 'nik tidak boleh kosong',
  errFullName: 'full name tidak boleh kosong',
  errPassword: 'password tidak boleh kosong',
  errPhoneNumber: 'phone_number tidak boleh kosong',
  errEmail: 'email tidak boleh kosong',
  errChartLength: 'Character length must be between 2 and 50',
  errEmployee: 'Could not find any employee',
  errUnknown: 'Unknown error',
  errInteger: 'Must be integer and larger than 0',
  errLimit: 'The limit must be 1, 5, 10, 20, or 50',
  errLocation: 'location file tidak boleh kosong',
};

module.exports.errorMsg = errorMsg;

const { check, query, param } = require('express-validator');
/**
 * BEGIN validation object
 * @return {Object} Return validation required for API.
 */
module.exports = {
  postEmployee: [
    check(['nik'])
      .notEmpty()
      .withMessage(errorMsg.errNik),
    check(['password'])
      .notEmpty()
      .withMessage(errorMsg.errPassword),
    check(['fullname'])
      .notEmpty()
      .withMessage(errorMsg.errFullName),
    check(['phone_number'])
      .notEmpty()
      .withMessage(errorMsg.errPhoneNumber),
    check(['email'])
      .notEmpty()
      .withMessage(errorMsg.errEmail),
  ],

  loginEmployee: [
    check(['nik'])
      .notEmpty()
      .withMessage(errorMsg.errNik),
    check(['password'])
      .notEmpty()
      .withMessage(errorMsg.errPassword)
  ],

  setAbsences: [
    check(['employee_id'])
      .notEmpty()
      .withMessage(errorMsg.errID),
    check(['selfie'])
      .notEmpty()
      .withMessage(errorMsg.errSelfie)
  ],

  readImage: [
    check(['location'])
      .notEmpty()
      .withMessage(errorMsg.errLocation),
  ],
  
  updateEmployee: [
    param('id').isInt({ min: 1 }).withMessage(errorMsg.errInteger),
  ],
};
