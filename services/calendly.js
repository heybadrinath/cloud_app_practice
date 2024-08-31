const ApiClient = require("../APIRequest/apiClient");

class CalendlyService {
  constructor(accessToken) {
    this.apiClient = new ApiClient(accessToken);
  }

  async listUsers() {
    // Assuming Calendly has an endpoint to list users or teams.
    return await this.apiClient.makeRequest(
      "GET",
      "https://api.calendly.com/users/me" // Update the endpoint as per Calendly's API documentation
    );
  }
  

}

module.exports = CalendlyService;
