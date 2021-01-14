<template>
  <div id="app">
    <div id="nav">
      <Menubar :model="menus">
        <template #start>
          <font-awesome-icon :icon="['far', 'camera-movie']" size="2x"/>
        </template>
      </Menubar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Button from 'primevue/button';

export default {
  name: "Login",
  data() {
    return {
      menus: [
        {label: 'Home', icon: 'pi pi-fw pi-home', to: '/'},
        {label: 'About', icon: 'pi pi-fw pi-info', to: '/about'},
        {label: 'Login', icon: 'pi pi-fw pi-sign-in', url: this.loginLink, visible: () => !this.isAuthenticated},
        {
          label: 'Logout', icon: 'pi pi-fw pi-sign-out', visible: () => this.isAuthenticated, command: () => {
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
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
