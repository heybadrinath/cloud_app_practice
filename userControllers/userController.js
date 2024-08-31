const OAuthConfig = require("../config/oauth");
const LastPassService = require("../services/lastpass");
const CalendlyService = require("../services/calendly");
const DropboxService = require("../services/dropbox");

class UserController {
  async authorizeUser(req, res) {
    try {
      const { service } = req.params;
      const authUrl = OAuthConfig.getAuthUrl(service);
      console.log(authUrl);
      res.redirect(authUrl);
    } catch (error) {
      res
        .status(500)
        .send({ error: "Failed to authorize user", error: error.message });
    }
  }

  async listUsers(req, res) {
    try {
      const authorizationCode = req.query.code;
      const { service } = req.query;
      if (!authorizationCode) {
        return res.status(400).send({ error: "Missing authorization code" });
      }

      const accessToken = await OAuthConfig.getOAuthToken(
        service,
        authorizationCode
      );

      let serviceInstance;
      if (service === "lastpass") {
        serviceInstance = new LastPassService(accessToken);
      } else if (service === "calendly") {
        serviceInstance = new CalendlyService(accessToken);
      } else if (service === "dropbox") {
        serviceInstance = new DropboxService(accessToken);
      } else {
        return res.status(400).send({ error: "Unsupported service" });
      }

      const users = await serviceInstance.listUsers();
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Failed to retrieve users", details: error.message });
    }
  }
}

module.exports = new UserController();
