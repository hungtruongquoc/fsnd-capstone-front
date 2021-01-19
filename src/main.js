import {createApp} from 'vue'
import App from './App.vue'
import routerBuilder from './router'
import store from './store'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
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
import Tooltip from 'primevue/tooltip';
import Toast from 'primevue/toast';
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Vue Auth ///////////////////////////////////////////////////////////////////////////////////////////////////////////
import {createAuth} from '@websanova/vue-auth'
import VueAuthOptions from './config/auth'
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FontAwesome ////////////////////////////////////////////////////////////////////////////////////////////////////////
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faHome,
  faSignInAlt,
  faBullhorn,
  faSignOut,
  faCameraMovie,
  faFilmAlt,
  faUserCircle,
  faPlusCircle,
  faTimes,
  faSave,
  faSpinner,
  faTrashAlt,
  faEdit,
} from '@fortawesome/pro-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import axios from "axios";
import {useAuth0} from "./services/auth"
import Config from './config/config'
import VueAxios from "vue-axios";
import {faCheckCircle, faMinus} from "@fortawesome/pro-solid-svg-icons";

library.add(faHome, faSignInAlt, faBullhorn, faSignOut, faCameraMovie, faFilmAlt, faUserCircle, faPlusCircle, faTimes,
  faSave, faSpinner, faTrashAlt, faEdit, faCheckCircle, faMinus)

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
app.use(VueAxios, axios).use(store).use(PrimeVue).use(router).use(auth).use(ToastService).use(ConfirmationService);
app.component('font-awesome-icon', FontAwesomeIcon)
  .component('Button', Button)
  .component('Menubar', Menubar)
  .component('PanelMenu', PanelMenu)
  .component('Toast', Toast)
  .component('Menu', Menu)
  .component('ConfirmDialog', ConfirmDialog)
// Directives
app.directive('tooltip', Tooltip).directive('show-button-text', {
  // When the bound element is mounted into the DOM...
  mounted(el, binding) {
    // Focus the element
    const textNode = document.createElement('span')
    textNode.classList.add('p-ml-2')
    textNode.innerText = binding.value || 'Text'
    el.appendChild(textNode)
  }
}).directive('show-add-icon', {
  mounted(el) {
    const iconNode = document.createElement('i')
    iconNode.classList.add('far')
    iconNode.classList.add('fa-plus-circle')
    iconNode.classList.add('fa-lg')
    el.prepend(iconNode)
  }
})
app.mount('#app')

