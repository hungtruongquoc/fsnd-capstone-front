<template>
  <BasePage :show-search-box="false">
    <template v-slot:title>Crew Admin</template>
    <div class="home">
    </div>
  </BasePage>
</template>

<script>
// @ is an alias to /src
import BasePage from "./BasePage"

export default {
  name: 'Home',
  components: {BasePage},
  created() {
    console.log(this.isAuthenticated)
    console.log('Home Page created')
  }
}
</script>
