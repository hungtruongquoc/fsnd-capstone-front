<template>
  <BasePage>
    <template v-slot:title>
      Movies
    </template>
    Test
  </BasePage>
</template>

<script>
import BasePage from "./BasePage.vue"

export default {
  name: "Movie",
  components: {BasePage}
}
</script>

<style scoped>

</style>
