const ApiClient = require("../APIRequest/apiClient");

class DropboxService {
  constructor(accessToken) {
    this.apiClient = new ApiClient(accessToken);
  }

  async listUsers() {
    return await this.apiClient.makeRequest(
      "POST",
      "https://api.dropboxapi.com/2/sharing/list_folders",
      {}
    );
  }
}

module.exports = DropboxService;
