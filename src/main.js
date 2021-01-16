import {createApp} from 'vue'
import App from './App.vue'
import routerBuilder from './router'
import store from './store'
// Prime Vue //////////////////////////////////////////////////////////////////////////////////////////////////////////
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import PanelMenu from 'primevue/panelmenu'
import Menu from 'primevue/menu'
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Vue Auth ///////////////////////////////////////////////////////////////////////////////////////////////////////////
import {createAuth} from '@websanova/vue-auth'
import VueAuthOptions from './config/auth'
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FontAwesome ////////////////////////////////////////////////////////////////////////////////////////////////////////
import {library} from '@fortawesome/fontawesome-svg-core'
import {faHome, faSignInAlt, faBullhorn, faSignOut, faCameraMovie, faFilmAlt, faUserCircle} from '@fortawesome/pro-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import axios from "axios";
import {useAuth0} from "./services/auth"
import Config from './config/config'
import VueAxios from "vue-axios";

library.add(faHome, faSignInAlt, faBullhorn, faSignOut, faCameraMovie, faFilmAlt, faUserCircle)

const app = createApp(App)
const router = routerBuilder()
const auth = createAuth({
  plugins: {
    http: axios,
    router
  },
  ...VueAuthOptions
})

app.use(Config)
app.mixin(useAuth0({
  redirectUri: `${window.location.origin}/movies`,
  onRedirectCallback: appState => {
    app.$router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
  }
}))
app.use(VueAxios, axios).use(store).use(PrimeVue).use(router).use(auth)
app.component('font-awesome-icon', FontAwesomeIcon)
  .component('Button', Button)
  .component('Menubar', Menubar)
  .component('PanelMenu', PanelMenu)
  .component('Menu', Menu)

app.mount('#app')

