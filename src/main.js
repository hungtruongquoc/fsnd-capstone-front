import {createApp} from 'vue'
import App from './App.vue'
import routerBuilder from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar';
import {useAuth0} from "./services/auth"
import Config from './config/config'
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faBullhorn, faSignOut, faCameraMovie } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faSignInAlt, faBullhorn, faSignOut, faCameraMovie)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
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
app.component('Menubar', Menubar)

app.mount('#app')

