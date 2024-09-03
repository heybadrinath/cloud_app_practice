const BaseService = require("./baseService");
const logger = require("../config/logger");

class CalendlyService extends BaseService {
  async listUsers() {
    logger.info("CalendlyService: Listing users");
    return await this.makeRequest("GET", "https://api.calendly.com/users/me");
  }

  async inviteUserToOrganization(uuid, email) {
    logger.info(`CalendlyService: Inviting user ${email} to organization ${uuid}`);
    const invitationData = { email };
    return await this.makeRequest(
      "POST",
      `https://api.calendly.com/organizations/${uuid}/invitations`,
      invitationData
    );
  }

  async removeUserFromOrganization(uuid, userId) {
    logger.info(`CalendlyService: Removing user ${userId} from organization ${uuid}`);
    if (!uuid) {
      logger.error("CalendlyService: UUID is required for removing a user");
      throw new Error("User UUID is required");
    }
    return await this.makeRequest(
      "DELETE",
      `https://api.calendly.com/organizations/${uuid}/invitations/${userId}`
    );
  }
}

module.exports = CalendlyService;
