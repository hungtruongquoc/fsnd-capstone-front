const config = {
  apiBaseUrl: process.env.VUE_APP_API_BASE_URL || 'http://localhost:8081',
  locale: process.env.VUE_APP_LOCALE,
  auth0: {
    domain: process.env.VUE_APP_AUTH0_DOMAIN,
    clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
    audience: process.env.VUE_APP_AUTH0_AUDIENCE,
  },
  sso: {
    enabled: process.env.VUE_APP_SSO_ENABLED,
  },
};

export default {
  install(app) {
    app.config.globalProperties.appConfig = config
    // app.config.globalProperties.$appConfig = config
  }
};
