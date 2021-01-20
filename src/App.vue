<template>
  <div id="app">
    <div id="nav">
      <Menubar :model="menus">
        <template #start>
          <span style="margin: 24px;">
            <font-awesome-icon :icon="['far', 'camera-movie']" size="2x"/>
          </span>
        </template>
        <template #end v-if="isAuthenticated">
          <div class="user-info p-grid p-ai-center vertical-container">
            <router-link to="/current-user">
              <span class="p-col">
                <font-awesome-icon :icon="['far', 'user-circle']" size="2x"/>
              </span>
            </router-link>
            <h4 class="p-text-capitalize p-col">{{ role }}</h4>
          </div>
        </template>
      </Menubar>
    </div>
    <div class="p-grid" style="margin-left: 0">
      <div class="p-col-1 app-menu" style="background-color: whitesmoke; height: 91.5vh; overflow: hidden"
           v-if="isAuthenticated">
        <Menu :model="secondaryMenu"/>
      </div>
      <div class="p-col">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import {RouterLink} from 'vue-router'

export default {
  name: "Login",
  components: {RouterLink},
  data() {
    return {
      doInitialAuthentication: true,
      secondaryMenu: [
        {
          icon: 'fas fa-fw fa-film-alt fa-lg', to: '/crew', label: 'Movies', class: 'no-label',
          visible: () => this.can('view:movies')
        },
        {
          icon: 'fas fa-fw fa-user-cowboy fa-lg', to: '/artists', label: 'Artists', class: 'no-label',
          visible: () => this.can('view:actors')
        },
        {
          icon: 'fas fa-fw fa-users fa-lg', to: '/crews', label: 'Crews', class: 'no-label',
          visible: () => this.can('update:crew')
        },
      ],
      menus: [
        {label: 'Home', icon: 'fas fa-fw fa-home', to: '/'},
        {label: 'About', icon: 'fas fa-fw fa-info', to: '/about'},
        {label: 'Login', icon: 'fas fa-fw fa-sign-in-alt', url: this.loginLink, visible: () => !this.isAuthenticated},
        {
          label: 'Logout', icon: 'fas fa-fw fa-sign-out', visible: () => this.isAuthenticated, command: () => {
            this.logout();
          }
        },
      ]
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .p-menu {
    background-color: whitesmoke;
    border: none;
  }

  .app-menu {
    .p-menu {
      width: initial;
      margin: 0 -.5rem;

      .p-menuitem {
        a {
          svg {
            margin: auto;
          }
        }
      }
    }

    .no-label {
      .p-menuitem-text {
        display: none;
      }
    }
  }

  #nav {
    //padding: 30px;
    //
    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
