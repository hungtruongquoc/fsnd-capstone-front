import {createApp} from 'vue'
import App from './App.vue'
import routerBuilder from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import {domain, clientId, audience} from "../auth_config.json";
import {useAuth0} from "./services/auth";

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css'

const app = createApp(App)

app.mixin(useAuth0({
  domain: `${domain}.auth0.com`,
  audience,
  clientId,
  onRedirectCallback: appState => {
    app.$router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
  }
}))

app.use(store)
app.use(PrimeVue)
app.use(routerBuilder())
app.component('Button', Button)

app.mount('#app')

