const fs = require("fs");
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
      console.log(error);
      reject(error);
    }
  });
};

module.exports = uploadBase64ToImage;
