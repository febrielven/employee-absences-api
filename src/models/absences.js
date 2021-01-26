// constructor
const Absences = function (args) {
  this.id = args.id;
  this.employee_id = args.employee_id;
  this.date_in = args.date_in;
  this.date_out = args.date_out;
  this.selfie = args.selfie;
  this.created = args.created;
  this.now  =args.now;
};

/**
 * @description select Models
 * @return {Object} Return query for models
 */
Absences.select = () => {
  return {
    query: 'SELECT B.nik, B.fullname, A.date_in, A.date_out, A.selfie FROM absences A  JOIN employee B ON B.id = A.employee_id ORDER BY A.created DESC',
    args: [],
  };
};


/**
 * @description select Models
* @param {*} args
 * @param {string} employee_id
 * @param {Date} date
 * @return {Object} Return query for models
 */
Absences.selectByDate = (args) => {
  return {
    query: 'SELECT id, employee_id, date_in, date_out, created FROM absences WHERE employee_id = ? AND DATE(created) = ?',
    args: [args.employee_id,args.now]
  };
};



/**
 * @description create Models
 * @param {*} args
 * @param {string} employee_id
 * @param {Date} date_in
 * @param {string} selfie
 * @return {Object} Return query for models
 */
Absences.insertAbsences = (args) => {
  return {
    query: 'INSERT INTO absences (employee_id, date_in, selfie, created) VALUES (?)',
    args: [args.employee_id, args.date_in, args.selfie, args.created],
  };
};

/**
 * @description update Models
 * @param {*} args
 * @param {Date} date_out
 * @return {Object} Return query for models
 */
Absences.updateDateOut = (args) => {
  return {
    query:
      'UPDATE absences SET date_out = ? WHERE employee_id = ? AND DATE(created) = ?',
    args: [args.date_out, args.employee_id, args.now],
  };
};

module.exports = Absences;
