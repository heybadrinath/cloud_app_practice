const BaseService = require("./baseService");
const logger = require("../config/logger");

class GitHubService extends BaseService {
  async listOrganizationMembers(orgName = "heybadrinathtest1") {
    logger.info(`GitHubService: Listing members of organization ${orgName}`);
    return await this.makeRequest(
      "GET",
      `https://api.github.com/orgs/${orgName}/members`
    );
  }

  async inviteUserToOrganization(orgName = "heybadrinathtest1", email) {
    logger.info(`GitHubService: Inviting user ${email} to organization ${orgName}`);
    return await this.makeRequest(
      "POST",
      `https://api.github.com/orgs/${orgName}/invitations`,
      { email }
    );
  }

  async removeUserFromOrganization(orgName = "heybadrinathtest1", username) {
    logger.info(`GitHubService: Removing user ${username} from organization ${orgName}`);
    return await this.makeRequest(
      "DELETE",
      `https://api.github.com/orgs/${orgName}/members/${username}`
    );
  }
}

module.exports = GitHubService;
