const axios = require("axios");
require("dotenv").config();
const logger = require("./logger");

class OAuthConfig {
  constructor() {
    this.config = {
      lastpass: {
        authUrl: "https://lastpass.com/oauth2/authorize",
        tokenUrl: "https://lastpass.com/oauth2/token",
        clientId: process.env.LASTPASS_CLIENT_ID,
        clientSecret: process.env.LASTPASS_CLIENT_SECRET,
        redirectUri: process.env.LASTPASS_REDIRECT_URI,
      },
      calendly: {
        authUrl: "https://auth.calendly.com/oauth/authorize",
        tokenUrl: "https://auth.calendly.com/oauth/token",
        clientId: process.env.CALENDLY_CLIENT_ID,
        clientSecret: process.env.CALENDLY_CLIENT_SECRET,
        redirectUri: process.env.CALENDLY_REDIRECT_URI,
      },
      dropbox: {
        authUrl: "https://www.dropbox.com/oauth2/authorize",
        tokenUrl: "https://api.dropboxapi.com/oauth2/token",
        clientId: process.env.DROPBOX_CLIENT_ID,
        clientSecret: process.env.DROPBOX_CLIENT_SECRET,
        redirectUri: process.env.DROPBOX_REDIRECT_URI,
      },
      github: {
        authUrl: "https://github.com/login/oauth/authorize",
        tokenUrl: "https://github.com/login/oauth/access_token",
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        redirectUri: process.env.GITHUB_REDIRECT_URI,
      },
    };
  }

  getAuthUrl(service) {
    logger.info(`OAuthConfig: Generating OAuth URL for ${service}`);

    const config = this.config[service];
    if (!config) throw new Error(`Unsupported service: ${service}`);
    return `${config.authUrl}?response_type=code&client_id=${config.clientId}&redirect_uri=${config.redirectUri}`;
  }

  async getOAuthToken(service, authorizationCode) {
    logger.info(`OAuthConfig: Getting OAuth token for ${service}`);

    const config = this.config[service];
    if (!config) throw new Error(`Unsupported service: ${service}`);

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", authorizationCode);
    params.append("redirect_uri", config.redirectUri);
    params.append("client_id", config.clientId);
    params.append("client_secret", config.clientSecret);

    try {
      const response = await axios.post(config.tokenUrl, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      if (service === "github") {
        const resultParams = new URLSearchParams(response.data);
        return resultParams.get("access_token"); // Extracting the access_token from the URL-encoded string since github return is not same for all other returns.
      }

      return response.data.access_token;
    } catch (error) {
      console.error("Failed to retrieve access token:", error);
      throw new Error("OAuth token retrieval failed");
    }
  }
}

module.exports = new OAuthConfig();
