const axios = require("axios");
const logger = require("../config/logger");

class ApiClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
    logger.info("ApiClient: Initialized with access token");
  }

  async makeRequest(method, url, data = null) {
    logger.info(`ApiClient: Making ${method} request to ${url}`);
    try {
      const response = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        data,
      });
      logger.info(`ApiClient: Request to ${url} successful`);
      return response.data;
    } catch (error) {
      logger.error(`ApiClient: Request to ${url} failed - ${error.message}`);
      throw error;
    }
  }
}

module.exports = ApiClient;
