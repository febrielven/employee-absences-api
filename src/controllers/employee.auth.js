const { validationResult } = require("express-validator");
const passwordHash = require("password-hash");
const asyncMiddleware = require("../utils/asyncMiddleWare");
const errorMsg = require("./employes.validation").errorMsg;
const handleError = require("../utils/handleError").handleError;
const logger = require("../utils/logger");

const Employee = require("../models").Employee;

// Authorization
exports.auth = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf("Basic ") === -1
    ) {
      throw new Error("Missing Authorization Header");
    }
    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");

    // Create a Employee
    const args = new Employee({
      nik: username,
      password: password,
    });

    //call query Statement
    let qStr = Employee.selectOneByNik(args);
    //excute query
    let rows = await asyncMiddleware.DBquery(qStr);

    if (!rows[0]) {
      return res
        .status(400)
        .send(handleError("NOT_FOUND_ERROR", "Data tidak ditemukan"));
    }
    var hashedPassword = rows[0].password;
    var verify = passwordHash.verify(args.password, hashedPassword);
    if (verify === true) {
      next();
    } else {
      return res
        .status(400)
        .send(handleError("NOT_FOUND_ERROR", "Data tidak ditemukan"));
    }
  } catch (error) {
    logger.error(error);

    return res.status(500).send(handleError("SERVER_ERROR", "Unknown error"));
  }
};

// login employee
exports.login = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf("Basic ") === -1
    ) {
      throw new Error("Missing Authorization Header");
    }
    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username] = credentials.split(":");

    // Create a Employee
    const args = new Employee({
      nik: username,
    });

    //call query Statement
    let qStr = Employee.selectOneByNik(args);
    //excute query
    let rows = await asyncMiddleware.DBquery(qStr);

    if (!rows[0]) {
      return res
        .status(400)
        .send(handleError("NOT_FOUND_ERROR", "Data tidak ditemukan"));
    }

    res.status(200).json({
      message: "Login Success",
      data: {
        nik: args.nik,
      },
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send(handleError("SERVER_ERROR", "Unknown error"));
  }
};
