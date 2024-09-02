const axios = require("axios");

class ApiClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  async makeRequest(method, url, data = null) {
    try {

      const response = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        data,
      });
      return response.data;
    } catch (error) {
      console.error("API request failed:", error);
      throw new Error("API request failed");
    }
  }
}

module.exports = ApiClient;
