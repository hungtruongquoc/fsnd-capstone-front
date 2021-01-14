import {getInstance} from "./authWrapper"

export function authGuardBuilder(to, from, next) {
  const appInstance = getInstance()
  const fn = () => {
    if (appInstance.isAuthenticated) {
      return next()
    }
    const redirect_uri = `${window.location.origin}${from.fullPath}`;

    appInstance.loginWithRedirect({appState: {targetUrl: to.fullPath}, redirect_uri});
  };

  if (!appInstance.loading) {
    return fn()
  }

  appInstance.$watch("loading", loading => {
    if (loading === false) {
      return fn()
    }
  })
}
