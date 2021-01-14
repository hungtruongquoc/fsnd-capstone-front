<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <Button class="p-button-link">
          <font-awesome-icon :icon="['far', 'home']" /> <span style="margin-left: 5px">Home</span>
        </Button>
      </router-link>
      |
      <router-link to="/about">
        <Button class="p-button-link">
          <font-awesome-icon :icon="['far', 'bullhorn']"/> <span style="margin-left: 5px">About</span>
        </Button>
      </router-link>
      <template v-if="!isAuthenticated">
        |
        <a :href="loginLink">
          <Button class="p-button-link">
            <font-awesome-icon :icon="['far', 'sign-in-alt']"/> <span style="margin-left: 5px">Login</span>
          </Button>
        </a>
      </template>
      <template v-else>
        |
        <Button class="p-button-link" @click="logout">
          <font-awesome-icon :icon="['far', 'sign-out']"/> <span style="margin-left: 5px">Logout</span>
        </Button>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Button from 'primevue/button';

export default {
  name: "Login",
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
