// constructor
const Employee = function(employee) {
    this.id = employee.id;
    this.nik = employee.nik;
    this.password = employee.password;
    this.fullname = employee.fullname;
    this.phone_number = employee.phone_number;
    this.email = employee.email;
};

/**
 * @description select Models
 * @return {Object} Return query for models
 */
Employee.select = () => {
  return {
    query: 'SELECT * from employee',
    args: [],
  };
};

/**
 * @description create Models
 * @param {*} args
 * @param {string} nik
 * @param {string} password
 * @param {string} phone_number
 * @param {email} email
 * @return {Object} Return query for models
 */
Employee.insert = (args) => {
  return {
    query:'INSERT INTO employee (nik, password,fullname, phone_number, email) VALUES (?)',
    args: [args.nik, args.password, args.fullname, args.phone_number, args.email],
  };
};


/**
 * @description select one Models
 * @param {int} id
 * @return {Object} Return query for models
 */
Employee.selectOne = (args) => {
    return {
      query: 'SELECT * from employee WHERE id=?',
      args: [args.id],
    };
};

/**
 * @description select one Models
 * @param {int} id
 * @return {Object} Return query for models
 */
Employee.selectOneByNik = (args) => {
  return {
    query: 'SELECT * from employee WHERE nik=? limit 1',
    args: [args.nik],
  };
};




/**
 * @description update Models
 * @param {*} args
 * @param {string} nik
 * @param {string} password
 * @param {string} phone_number
 * @param {email} email
 * @return {Object} Return query for models
 */
Employee.update = (args) => {
    return {
        query: 'UPDATE employee set nik = ?, password = ?, phone_number= ?, email =  ? WHERE id =?',
        args: [args.nik, args.password, args.phone_number, args.email, args.id]
    };
};


/**
 * @description select one Models
 * @param {int} id
 * @return {Object} Return query for models
 */
Employee.deleteOne = (args) => {
    return {
      query: 'delete from employee WHERE id=?',
      args: [args.id],
    };
};


module.exports = Employee;