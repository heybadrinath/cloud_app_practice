const ApiClient = require("../APIRequest/apiClient");

class CalendlyService {
  constructor(accessToken) {
    this.apiClient = new ApiClient(accessToken);
  }

  async listUsers() {
    return await this.apiClient.makeRequest(
      "GET",
      "https://api.calendly.com/users/me"
    );
  }

  async inviteUserToOrganization(uuid, email) {
    const invitationData = {
      email,
    };

    return await this.apiClient.makeRequest(
      "POST",
      `https://api.calendly.com/organizations/${uuid}/invitations`,
      invitationData
    );
  }


  async removeUserFromOrganization(uuid, email) {
    // code to check if the user exists or not in the org
    if (!uuid) {
      throw new Error(`User with email ${email} not found in Calendly organization.`);
    }

    return await this.apiClient.makeRequest(
      "DELETE",
      `https://api.calendly.com/organizations/${uuid}/invitations/${userId}`
    );
  }


}

module.exports = CalendlyService;
