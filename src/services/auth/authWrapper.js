import createAuth0Client from "@auth0/auth0-spa-js"
import decode from 'jwt-decode';

let appInstance
// const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);
const JWTS_LOCAL_KEY = 'JWTS_LOCAL_KEY';
// const JWTS_ACTIVE_INDEX_KEY = 'JWTS_ACTIVE_INDEX_KEY';

/** Returns the current instance of the SDK */
export const getInstance = () => appInstance;

export const useAuth0 = ({
                           // onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
                           redirectUri = window.location.origin,
                           ...options
                         }) => {
  // if (instance) return instance;

  return {
    data() {
      return {
        loading: true,
        user: {},
        auth0Client: null,
        popupOpen: false,
        error: null,
        payload: null,
        token: null
      }
    },
    methods: {
      logout() {
        this.token = '';
        this.payload = null;
        this.set_jwt();
        const {domain, clientId} = options;
        const logoutUrl = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${window.location.origin}`;
        window.location.assign(logoutUrl);
      },
      activeJWT() {
        return this.token
      },
      load_jwts() {
        this.token = localStorage.getItem(JWTS_LOCAL_KEY) || null
        if (this.token) {
          this.decodeJWT(this.token)
        }
      },
      // invoked in app.component on load
      check_token_fragment() {
        // parse the fragment
        const fragment = window.location.hash.substr(1).split('&')[0].split('=')
        // check if the fragment includes the access token
        if (fragment[0] === 'access_token') {
          // add the access token to the jwt
          this.token = fragment[1]
          // save jwts to localstore
          this.set_jwt()
        }
      },
      set_jwt() {
        localStorage.setItem(JWTS_LOCAL_KEY, this.token)
        if (this.token) {
          this.decodeJWT(this.token)
        }
        else {
          localStorage.removeItem(JWTS_LOCAL_KEY);
        }
      },
      decodeJWT(token) {
        this.payload = decode(token)
        return this.payload
      },
      build_login_link(callbackPath = '') {
        const {audience, domain, clientId} = options;
        let link = 'https://'
        link += domain
        link += '/authorize?'
        link += 'audience=' + audience + '&'
        link += 'response_type=token&'
        link += 'client_id=' + clientId + '&'
        link += 'redirect_uri=' + callbackPath
        return link
      },
      async loginWithPopup(options, config) {
        this.popupOpen = true;

        try {
          await this.auth0Client.loginWithPopup(options, config);
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = await this.auth0Client.isAuthenticated();
          this.error = null;
        } catch (e) {
          console.error(e);
          this.error = e;
        } finally {
          this.popupOpen = false;
        }
      },
      async handleRedirectCallback() {
        this.loading = true;
        try {
          await this.auth0Client.handleRedirectCallback();
          debugger;
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = true;
          this.error = null;
        } catch (e) {
          this.error = e;
        } finally {
          this.loading = false;
        }
      },
      loginWithRedirect(o) {
        window.location.assign(this.build_login_link(o.redirect_uri));
      },
      getIdTokenClaims(o) {
        return this.auth0Client.getIdTokenClaims(o);
      },
      getTokenSilently(o) {
        return this.auth0Client.getTokenSilently(o);
      },
      getTokenWithPopup(o) {
        return this.auth0Client.getTokenWithPopup(o);
      }
    },
    async mounted() {

      try {
        this.auth0Client = await createAuth0Client({
          ...options,
          client_id: options.clientId,
          redirect_uri: redirectUri
        })
        // debugger;
        // const {appState} = await this.auth0Client.handleRedirectCallback();
        // this.error = null;
        // onRedirectCallback(appState);
        this.check_token_fragment()
        this.load_jwts();
      } catch (e) {
        this.error = e;
      } finally {
        // this.isAuthenticated = await this.auth0Client.isAuthenticated();
        // this.user = await this.auth0Client.getUser();
        this.loading = false;
        appInstance = this;
      }
    },
    computed: {
      loginLink() {
        return this.build_login_link(window.location.origin);
      },
      isAuthenticated() {
        debugger;
        return !!this.payload;
      }
    }
  }
}