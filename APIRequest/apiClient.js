const axios = require("axios");

class ApiClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }
  async makeRequest(method, url, data = null) {
    const configData = {
      method: method,
      url: url,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios(configData);
      return response.data;
    } catch (error) {
      throw new Error(`API Request failed: ${error.message}`);
    }
  }
}

module.exports = ApiClient;
