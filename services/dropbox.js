const BaseService = require("./baseService");
const logger = require("../config/logger");

class DropboxService extends BaseService {
  async listUsers() {
    logger.info("DropboxService: Listing users");
    return await this.makeRequest(
      "POST",
      "https://api.dropboxapi.com/2/sharing/list_folders",
      {}
    );
  }

  async removeUserFromOrganization(userId) {
    logger.info(`DropboxService: Removing user ${userId} from organization`);
    return await this.makeRequest(
      "POST",
      "https://api.dropboxapi.com/2/team/members/remove",
      { user_id: userId }
    );
  }
}

module.exports = DropboxService;
