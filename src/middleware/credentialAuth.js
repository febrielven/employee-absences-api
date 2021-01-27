const credentailAuth = async (req) => {
  try {
    if (
        !req.headers.authorization ||
        req.headers.authorization.indexOf("Basic ") === -1
      ) {
        return null;
      }
      // verify auth credentials
      const base64Credentials = req.headers.authorization.split(" ")[1];
      const credentials = Buffer.from(base64Credentials, "base64").toString(
        "ascii"
      );
      const [username, password] = credentials.split(":");
      return {
        username: username,
        password: password,
      };
  } catch (error) {
      
  }
};

module.exports = credentailAuth;
