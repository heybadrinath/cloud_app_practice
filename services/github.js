    const ApiClient = require("../APIRequest/apiClient");

    class GitHubService {
    constructor(accessToken) {
        this.apiClient = new ApiClient(accessToken);
    }

    // List users in an organization
    async listOrganizationMembers(orgName = "heybadrinathtest1") {
        return await this.apiClient.makeRequest(
        "GET",
        `https://api.github.com/orgs/${orgName}/members`
        );
    }

    // Invite a user to an organization
    async inviteUserToOrganization(orgName = "heybadrinathtest1", email) {
        return await this.apiClient.makeRequest(
        "POST",
        `https://api.github.com/orgs/${orgName}/invitations`,
        { email }
        );
    }

    // Remove a user from an organization
    async removeUserFromOrganization(orgName = "heybadrinathtest1", username) {
        return await this.apiClient.makeRequest(
        "DELETE",
        `https://api.github.com/orgs/${orgName}/members/${username}`
        );
    }
    }

    module.exports = GitHubService;
