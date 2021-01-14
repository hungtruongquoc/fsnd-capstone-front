<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <Button label="Home" class="p-button-link"/>
      </router-link>
      |
      <router-link to="/about">
        <Button label="About" class="p-button-link"/>
      </router-link>
      <template v-if="!isAuthenticated">
        |
        <a :href="loginLink">
          <Button label="Login" class="p-button-link"/>
        </a>
      </template>
      <template v-else>
        |
        <Button label="Logout" class="p-button-link" @click="logout"/>
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
