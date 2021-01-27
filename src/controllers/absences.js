const { validationResult } = require("express-validator");
const handleError = require("../utils/handleError").handleError;
const logger = require("../utils/logger");
const asyncMiddleware = require("../utils/asyncMiddleWare");
const formatDate = require("../utils/formatDate");

const credentialAuth = require("../middleware/credentialAuth");
const {
  uploadBase64ToImage,
  convertImageToBase64,
} = require("../utils/upload");

const Employee = require("../models").Employee;
const Absences = require("../models").Absences;

// Get ALL Absences
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
    let qStr = Absences.select();
    // excute query & get absences
    let rows = await asyncMiddleware.DBquery(qStr);

    rows = await forEach(rows);
    console.log("res");
    res.status(200).json({
      message: "fetch Success",
      data: rows,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send(handleError("SERVER_ERROR", "Unknown error"));
  }
};

// Add Absences
exports.addAbsences = async (req, res) => {
  try {
    // Middleware
    const users = await credentialAuth(req);
    const image = await uploadBase64ToImage(req);

    // Create a Employee
    const argsEmp = new Employee({
      nik: users.username,
    });

    //call query Statement
    var qStr = Employee.selectOneByNik(argsEmp);
    //excute query
    var rows = await asyncMiddleware.DBquery(qStr);

    if (!rows[0]) {
      return res
        .status(400)
        .send(handleError("NOT_FOUND_ERROR", "Data tidak ditemukan"));
    }

    // Create a Absences
    const args = new Absences({
      employee_id: rows[0].id,
      date_in: new Date(),
      date_out: new Date(),
      selfie: image,
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
    res.status(200).json({
      message: "fetch Success",
      data: rows,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send(handleError("SERVER_ERROR", "Unknown error"));
  }
};

// Read Image with location file
exports.readImage = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error_code: "VALIDATION_ERROR",
        detail: errors.array(),
      });
    }

    let location = req.body.location;
    let base64 = await convertImageToBase64(location);
    if (!base64) {
      return res
        .status(400)
        .send(handleError("NOT_FOUND_ERROR", "Data tidak ditemukan"));
    }

    res.status(200).json({
      message: "fetch Success",
      data: {
        image: base64,
      },
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send(handleError("SERVER_ERROR", "Unknown error"));
  }
};
