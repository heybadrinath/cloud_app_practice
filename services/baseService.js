const ApiClient = require("../APIRequest/apiClient");
const logger = require("../config/logger");
class BaseService {
  constructor(accessToken) {
    if (new.target === BaseService) {
      throw new TypeError("Cannot construct BaseService instances directly");
    }
    this.apiClient = new ApiClient(accessToken);
    logger.info(`${this.constructor.name} initialized with access token.`);
  }

  async makeRequest(method, url, data = null) {
    logger.info(`${this.constructor.name} making ${method} request to ${url}`);
    return await this.apiClient.makeRequest(method, url, data);
  }
}

module.exports = BaseService;
