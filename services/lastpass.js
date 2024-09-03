const BaseService = require("./baseService");
const logger = require("../config/logger");

class LastPassService extends BaseService {
  async addUser(user) {
    logger.info(`LastPassService: Adding user with details: ${JSON.stringify(user)}`);
    return await this.makeRequest("POST", "https://api.lastpass.com/users", user);
  }

  async listUsers() {
    logger.info("LastPassService: Listing users");
    return await this.makeRequest("GET", "https://api.lastpass.com/users");
  }

  async deleteUser(userId) {
    logger.info(`LastPassService: Deleting user with ID: ${userId}`);
    return await this.makeRequest("DELETE", `https://api.lastpass.com/users/${userId}`);
  }
}

module.exports = LastPassService;
