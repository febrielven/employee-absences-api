'use strict';
const port = 8010;
const bodyParser = require('body-parser');
const log = require('./src/utils/logger');
const db =  require('./config/dbconfig');
const app = require('./src/app')(db);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
    log.info(`App started and listening on port ${port}`);
    console.log(`App started and listening on port ${port}`);
});