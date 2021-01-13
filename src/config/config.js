const config = {
    apiBaseUrl: process.env.VUE_APP_API_BASE_URL,
    locale: process.env.VUE_APP_LOCALE,
    sso: {
        enabled: process.env.VUE_APP_SSO_ENABLED,
    },
}

export default {
    install (Vue) {
        Vue.appConfig = config
        Vue.prototype.$appConfig = config
    }
}
