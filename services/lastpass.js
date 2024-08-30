const ApiClient = require("../APIRequest/apiClient");

class LastPassService {
  constructor(accessToken) {
    this.apiClient = new ApiClient(accessToken);
  }

  async addUser(user) {
    return await this.apiClient.makeRequest(
      "POST",
      "https://api.lastpass.com/users",
      user
    );
  }
  async listUsers() {
    return await this.apiClient.makeRequest(
      "GET",
      "https://api.lastpass.com/users"
    );
  }

  async deleteUser(userId) {
    return await this.apiClient.makeRequest(
      "DELETE",
      `https://api.lastpass.com/users/${userId}`
    );
  }
}

module.exports = LastPassService;
