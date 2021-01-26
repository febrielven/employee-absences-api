const { validationResult } = require("express-validator");
const passwordHash = require("password-hash");

const handleError = require("../utils/handleError").handleError;
const logger = require("../utils/logger");
const asyncMiddleware = require("../utils/asyncMiddleWare");
const Employee = require("../models").Employee;

// Get Employee
exports.getAll = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error_code: "VALIDATION_ERROR",
        detail: errors.array(),
      });
    }
    //call query statement
    let qStr = Employee.select();
    // excute query & get employee
    let rows = await asyncMiddleware.DBquery(qStr);
    res.status(200).json({
      message: "fetch Success",
      data: rows,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send(handleError("SERVER_ERROR", "Unknown error"));
  }
};

// Create and Save a new Employee
exports.create = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error_code: "VALIDATION_ERROR",
        detail: errors.array(),
      });
    }
    // Create a Employee
    const args = new Employee({
      nik: req.body.nik,
      password: passwordHash.generate(req.body.password),
      fullname: req.body.fullname,
      phone_number: req.body.phone_number,
      email: req.body.email,
    });

    //call query Statement
    let qStr = Employee.insert(args);
    //excute & save Employee
    let rows = await asyncMiddleware.DBquery(qStr);

    res.status(200).json({
      message: "fetch Success",
      data: {
        id: rows.insertId,
      },
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send(handleError("SERVER_ERROR", "Unknown error"));
  }
};

// find one Employee
exports.findOne = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error_code: "VALIDATION_ERROR",
        detail: errors.array(),
      });
    }

    // Create a Employee
    const args = new Employee({
      id: req.params.id,
    });

    //call query statement
    let qStr = Employee.selectOne(args);
    let rows = await asyncMiddleware.DBquery(qStr);
    res.status(200).json({
      message: "fetch Success",
      data: rows[0],
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send(handleError("SERVER_ERROR", "Unknown error"));
  }
};

// Edit and Update a Employee
exports.update = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error_code: "VALIDATION_ERROR",
        detail: errors.array(),
      });
    }
    // Create a Employee
    const args = new Employee({
      id: req.params.id,
      nik: req.body.nik,
      password: passwordHash.generate(req.body.password),
      fullname: req.body.fullname,
      phone_number: req.body.phone_number,
      email: req.body.email,
    });

    //call query Statement
    let qStr = Employee.update(args);
    //excute & update Employee
    let rows = await asyncMiddleware.DBQueryOne(qStr);

    res.status(200).json({
      message: "fetch Success",
      data: { id: args.id },
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send(handleError("SERVER_ERROR", "Unknown error"));
  }
};

// find one Employee
exports.deleteOne = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error_code: "VALIDATION_ERROR",
        detail: errors.array(),
      });
    }

    // Create a Employee
    const args = new Employee({
      id: req.params.id,
    });

    //call query statement
    let qStr = Employee.deleteOne(args);
    let rows = await asyncMiddleware.DBquery(qStr);
    res.status(200).json({
      message: "fetch Success",
      data: rows,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send(handleError("SERVER_ERROR", "Unknown error"));
  }
};
