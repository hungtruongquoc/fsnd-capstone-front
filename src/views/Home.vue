<template>
  <BasePage :show-search-box="false">
    <template v-slot:title>Crew Admin</template>
    <div class="home p-grid" v-if="isAuthenticated">
      <div class="actor-stat p-col" v-if="stats && stats.actors">
        <h1 class="stat-name">Actors</h1>
        <router-link to="/artists">
          <h1>{{ stats.actors }}</h1>
        </router-link>
      </div>
      <div class="movie-stat p-col" v-if="stats && stats.movies">
        <h1 class="stat-name">Movies</h1>
        <router-link to="/movies">
          <h1>{{ stats.movies }}</h1>
        </router-link>
      </div>
    </div>
  </BasePage>
</template>

<script>
// @ is an alias to /src
import BasePage from "./BasePage"
import {RouterLink} from 'vue-router'

export default {
  name: 'Home',
  components: {BasePage, RouterLink},
  data() {
    return {
      stats: null
    }
  },
  async mounted() {
    if (this.isAuthenticated) {
      const data = await this.axios.get('/stats')
      this.stats = {...data}
    }
  }
}
</script>

<style scoped lang="scss">
.stat-name {
  font-weight: normal
}
</style>
