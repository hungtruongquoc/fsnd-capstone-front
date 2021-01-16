import driverHttpAxios from '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js';
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js';
import driverOAuth2Google from '@websanova/vue-auth/dist/drivers/oauth2/google.esm.js';
import driverOAuth2Facebook from '@websanova/vue-auth/dist/drivers/oauth2/facebook.esm.js';
import driverAuthBearer from '@websanova/vue-auth/dist/drivers/auth/bearer.esm.js';
import {JWTS_LOCAL_KEY} from "../services/auth";

export default {
  drivers: {
    http: driverHttpAxios,
    auth: driverAuthBearer,
    router: driverRouterVueRouter,
    oauth2: {
      google: driverOAuth2Google,
      facebook: driverOAuth2Facebook,
    }
  },
  options: {
    rolesKey: 'type',
    notFoundRedirect: {name: 'user-account'},
    refreshData: {enabled: false},
    fetchData: {
      enabled: false,
    },
    tokenDefaultKey: JWTS_LOCAL_KEY,
    stores: ['storage', 'cookie'],
  }
};
