import {createApp} from 'vue'
import App from './App.vue'
import routerBuilder from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import {useAuth0} from "./services/auth"
import Config from './config/config'
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(Config)
app.mixin(useAuth0({
  onRedirectCallback: appState => {
    app.$router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
  }
}))
app.use(store)
app.use(PrimeVue)
app.use(routerBuilder())
app.component('Button', Button)

app.mount('#app')

