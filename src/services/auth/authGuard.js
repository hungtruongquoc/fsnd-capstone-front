export function authGuard(appInstance) {
  const {$auth} = appInstance;
  return (to, from, next) => {
    const fn = () => {
      if ($auth.isAuthenticated) {
        return next();
      }

      $auth.loginWithRedirect({appState: {targetUrl: to.fullPath}});
    };

    if (!$auth.loading) {
      return fn();
    }

    appInstance.$watch("loading", loading => {
      if (loading === false) {
        return fn();
      }
    });
  };
}
