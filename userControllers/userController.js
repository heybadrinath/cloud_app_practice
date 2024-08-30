const OAuthConfig = require("../config/oauth");
const LastPassService = require("../services/lastpass");

class UserController {
  async addUser(req, res) {
    try {
      const lastpassToken = await OAuthConfig.getOAuthToken("lastpass");

      const lastpassService = new LastPassService(lastpassToken);

      const user = req.body;

      await lastpassService.addUser(user);
      res.status(201).send({ message: "User added successfully." });
    } catch (error) {
      res.status(500).send({ error: "Failed to add user" });
    }
  }

  async listUsers(req, res) {
    try {
      const lastpassToken = await OAuthConfig.getOAuthToken("lastpass");

      const lastpassService = new LastPassService(lastpassToken);
      const users = await lastpassService.listUsers();

      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ error: "Failed to retrieve users", error });
    }
  }

  async deleteUser(req, res) {
    try {
      const lastpassToken = await OAuthConfig.getOAuthToken("lastpass");

      const lastpassService = new LastPassService(lastpassToken);

      const userId = req.params.id;

      await lastpassService.deleteUser(userId);

      res.status(200).send({ message: "User deleted successfully." });
    } catch (error) {
      res.status(500).send({ error: "Failed to delete user" });
    }
  }

  async authorizeUser(req, res) {
    try {
      const { service } = req.params;
      const authUrl = OAuthConfig.getAuthUrl(service);
      res.redirect(authUrl);
    } catch (error) {
      res.status(500).send({ error: "Failed to authorize user" });
    }
  }
}

module.exports = new UserController();
