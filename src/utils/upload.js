const fs = require("fs");
const imageToBase64 = require("image-to-base64");
const logger = require("../utils/logger");

var ReadableData = require("stream").Readable;

/**
 * Description. Generate randow number
 * @return {integer} Return random number.
 */

const uploadBase64ToImage = async (req) => {
  let data = "";
  return new Promise((resolve, reject) => {
    try {
      req.on("data", function (chunk) {
        data += chunk;
      });
      req.on("end", function () {
        var base64Data = data.replace(/^data:image\/png;base64,/, "");
        const imageBufferData = Buffer.from(base64Data, "base64");
        var streamObj = new ReadableData();
        filename =
          "./files/selfie/selfie-" +
          Math.random().toString(36).substring(7) +
          ".png";
        streamObj.push(imageBufferData);
        streamObj.push(null);
        streamObj.pipe(fs.createWriteStream(filename));
        resolve(filename);
      });
    } catch (error) {
      logger.error(error);
      reject(error);
    }
  });
};

const convertImageToBase64 = async (location) => {
  return new Promise((resolve, reject) => {
    try {
      imageToBase64(location) // Path to the image
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          logger.error(error);
          reject(null);
        });
    } catch (error) {
      logger.error(error);
      resolve(null);
    }
  });
};

module.exports.uploadBase64ToImage = uploadBase64ToImage;
module.exports.convertImageToBase64 = convertImageToBase64;
