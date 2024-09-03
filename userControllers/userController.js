const OAuthConfig = require("../config/oauth");
const LastPassService = require("../services/lastpass");
const CalendlyService = require("../services/calendly");
const DropboxService = require("../services/dropbox");
const GitHubService = require("../services/github");
const logger = require("../config/logger");

class UserController {
  async authorizeUser(req, res) {
    try {
      const { service } = req.params;
      const authUrl = OAuthConfig.getAuthUrl(service);
      logger.info(`UserController: Authorizing user for service ${service}`);
      res.redirect(authUrl);
    } catch (error) {
      logger.error(
        `UserController: Failed to authorize user - ${error.message}`
      );
      res
        .status(500)
        .send({ error: "Failed to authorize user", error: error.message });
    }
  }

  async listUsers(req, res) {
    try {
      const { code: authorizationCode, service } = req.query;

      if (!authorizationCode) {
        logger.warn("UserController: Missing authorization code");
        return res.status(400).send({ error: "Missing authorization code" });
      }

      logger.info(`UserController: Listing users for service ${service}`);
      const accessToken = await OAuthConfig.getOAuthToken(
        service,
        authorizationCode
      );

      let serviceInstance, users;
      switch (service) {
        case "calendly":
          serviceInstance = new CalendlyService(accessToken);
          users = await serviceInstance.listUsers();
          break;
        case "lastpass":
          serviceInstance = new LastPassService(accessToken);
          users = await serviceInstance.listUsers();
          break;
        case "dropbox":
          serviceInstance = new DropboxService(accessToken);
          users = await serviceInstance.listUsers();
          break;
        case "github":
          serviceInstance = new GitHubService(accessToken);
          users = await serviceInstance.listOrganizationMembers();
          break;
        default:
          logger.warn(`UserController: Unsupported service ${service}`);
          return res.status(400).json({ error: "Unsupported service" });
      }

      res.status(200).send(users);
    } catch (error) {
      logger.error(
        `UserController: Failed to retrieve users - ${error.message}`
      );
      res
        .status(500)
        .send({ error: "Failed to retrieve users", details: error.message });
    }
  }

  async inviteUserToService(req, res) {
    try {
      const { service } = req.params;
      const { uuid, email } = req.body;
      logger.info(
        `UserController: Inviting user ${email} to service ${service}`
      );

      const authorizationCode = req.query.code;
      if (!authorizationCode) {
        logger.warn("UserController: Missing authorization code");
        return res.status(400).send({ error: "Missing authorization code" });
      }

      const accessToken = await OAuthConfig.getOAuthToken(
        service,
        authorizationCode
      );

      let serviceInstance;
      switch (service) {
        case "calendly":
          serviceInstance = new CalendlyService(accessToken);
          await serviceInstance.inviteUserToOrganization(uuid, email);
          break;
        case "lastpass":
          serviceInstance = new LastPassService(accessToken);
          await serviceInstance.addUser({ email });
          break;
        case "dropbox":
          serviceInstance = new DropboxService(accessToken);
          await serviceInstance.inviteUserToOrganization(uuid, email);
          break;
        case "github":
          serviceInstance = new GitHubService(accessToken);
          await serviceInstance.inviteUserToOrganization(uuid, email);
          break;
        default:
          logger.warn(`UserController: Unsupported service ${service}`);
          return res.status(400).send({ error: "Unsupported service" });
      }

      res
        .status(201)
        .send({
          message: `User invited successfully to ${service} organization.`,
        });
    } catch (error) {
      logger.error(
        `UserController: Failed to invite user to ${service} - ${error.message}`
      );
      res
        .status(500)
        .send({
          error: `Failed to invite user to ${service}`,
          details: error.message,
        });
    }
  }

  async removeUserFromService(req, res) {
    try {
      const { service } = req.params;
      const { uuid, email } = req.body;
      logger.info(
        `UserController: Removing user ${email} from service ${service}`
      );

      const authorizationCode = req.query.code;
      if (!authorizationCode) {
        logger.warn("UserController: Missing authorization code");
        return res.status(400).send({ error: "Missing authorization code" });
      }

      const accessToken = await OAuthConfig.getOAuthToken(
        service,
        authorizationCode
      );

      let serviceInstance;
      switch (service) {
        case "calendly":
          serviceInstance = new CalendlyService(accessToken);
          await serviceInstance.removeUserFromOrganization(uuid, email);
          break;
        case "lastpass":
          serviceInstance = new LastPassService(accessToken);
          await serviceInstance.deleteUser(uuid);
          break;
        case "dropbox":
          serviceInstance = new DropboxService(accessToken);
          await serviceInstance.removeUserFromOrganization(uuid);
          break;
        case "github":
          serviceInstance = new GitHubService(accessToken);
          await serviceInstance.removeUserFromOrganization(uuid, email);
          break;
        default:
          logger.warn(`UserController: Unsupported service ${service}`);
          return res.status(400).send({ error: "Unsupported service" });
      }

      res
        .status(200)
        .send({
          message: `User removed successfully from ${service} organization.`,
        });
    } catch (error) {
      logger.error(
        `UserController: Failed to remove user from ${service} - ${error.message}`
      );
      res
        .status(500)
        .send({
          error: `Failed to remove user from ${service}`,
          details: error.message,
        });
    }
  }
}

module.exports = new UserController();
