const axios = require("axios");

class OAuthConfig {
  constructor() {
    this.config = {
      lastpass: {
        authUrl: "https://lastpass.com/oauth2/authorize",
        clientId: process.env.LASTPASS_CLIENT_ID,
        redirectUri: process.env.LASTPASS_REDIRECT_URI,
      },
    };
  }

  getAuthUrl(service) {
    const config = this.config[service];
    if (!config) throw new Error(`Unsupported service: ${service}`);
    return `${config.authUrl}?response_type=code&client_id=${config.clientId}&redirect_uri=${config.redirectUri}`;
  }

  static async getOAuthToken(service, authorizationCode) {
    let tokenURL, clientID, clientSecret, redirectURI;

    switch (service) {
      case "lastpass":
        tokenURL = "https://lastpass.com/oauth2/token";
        clientID = process.env.LASTPASS_CLIENT_ID;
        clientSecret = process.env.LASTPASS_CLIENT_SECRET;
        redirectURI = process.env.LASTPASS_REDIRECT_URI;
        break;

      default:
        throw new Error("Unknown service");
    }

    const params = new URLSearchParams();
    // params.append("grant_type", "authorization_code");
    // params.append("code", authorizationCode);
    params.append("redirect_uri", redirectURI);
    params.append("client_id", clientID);
    params.append("client_secret", clientSecret);
    let tokenResponse;
    try {
      tokenResponse = await axios.post(tokenURL, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    } catch (error) {
      console.log(error);
    }

    return tokenResponse.data.access_token;
  }
}

module.exports = OAuthConfig;
