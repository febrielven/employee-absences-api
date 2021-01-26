const { validationResult } = require('express-validator');
const handleError = require('../utils/handleError').handleError;
const logger = require('../utils/logger');
const asyncMiddleware = require('../utils/asyncMiddleWare');
const formatDate = require('../utils/formatDate');

const Employee = require('../models').Employee;
const Absences = require('../models').Absences;

// Get ALL Absences
exports.getAll = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error_code: 'VALIDATION_ERROR',
        detail: errors.array(),
      });
    }
    //call query statement
    let qStr = Absences.select();
    // excute query & get absences
    let rows = await asyncMiddleware.DBquery(qStr);
    res.status(200).json({
      message: "fetch Success",
      data: rows,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send(handleError('SERVER_ERROR', 'Unknown error'));
  }
};

// Add Absences
exports.addAbsences = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error_code: 'VALIDATION_ERROR',
        detail: errors.array(),
      });
    }
    // Create a Employee
    const argsEmp = new Employee({
      nik: req.body.nik,
    });

    //call query Statement
    var qStr = Employee.selectOneByNik(argsEmp);
    //excute query
    var rows = await asyncMiddleware.DBquery(qStr);

    if (!rows[0]) {
      return res
        .status(400)
        .send(handleError('NOT_FOUND_ERROR', 'Data tidak ditemukan'));
    }

    // Create a Absences
    const args = new Absences({
      employee_id: rows[0].id,
      date_in: new Date(),
      date_out: new Date(),
      selfie: req.body.selfie,
      created: new Date(),
      now: formatDate.getDateString(new Date()),
    });
    
  

    //call query statement
    var qStr = Absences.selectByDate(args);
    // excute query
    var rows = await asyncMiddleware.DBQueryOne(qStr);

    if (rows[0]) {
      args.date_in = rows[0].date_in;
      //call query statement
      var qStr = Absences.updateDateOut(args);
      // excute query
      await asyncMiddleware.DBQueryOne(qStr);
    } else {
     
      //call query statement
      var qStr = Absences.insertAbsences(args);
      // excute query
      await asyncMiddleware.DBquery(qStr);
    }

    //call query statement
    var qStr = Absences.selectByDate(args);
    // excute query
    var rows = await asyncMiddleware.DBQueryOne(qStr);
    res.status(200).json(
      {
        message: "fetch Success",
        data: rows,
      }
    );
  } catch (error) {
    logger.error(error);
    return res.status(500).send(handleError('SERVER_ERROR', 'Unknown error'));
  }
};
