<template>
  <div id="app">
    <div id="nav">
      <Menubar :model="menus">
        <template #start>
          <span style="margin: 24px;">
            <font-awesome-icon :icon="['far', 'camera-movie']" size="2x"/>
          </span>
        </template>
      </Menubar>
    </div>
    <div class="p-grid" style="margin-left: 0">
      <div class="p-col-1" style="background-color: whitesmoke; height: 100vh; overflow: hidden"
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
import Button from 'primevue/button';

export default {
  name: "Login",
  data() {
    return {
      secondaryMenu: [
        {icon: 'fas fa-fw fa-film-alt fa-lg', to: '/movies'},
        {icon: 'fas fa-fw fa-user-cowboy fa-lg', to: '/artists'},
        {icon: 'fas fa-fw fa-users fa-lg', to: '/crews'},
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
  },
  components: [
    Button
  ]
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .p-menu {
    background-color: whitesmoke;
    border: none;
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
