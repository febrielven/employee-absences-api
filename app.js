"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

require("./src/routes/router")(app);
// set port, listen for requests
app.listen(8010, () => {
  console.log("Server is running on port 8010.");
});
