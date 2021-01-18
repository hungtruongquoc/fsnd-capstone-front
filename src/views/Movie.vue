<template>
  <BasePage>
    <template v-slot:title>
      Movies
    </template>
    <template v-slot:pageScopeAction>
      <Button v-tooltip="'Create a new movie'" @click="displayNewForm" v-show-button-text="'New Movie'" v-show-add-icon/>
    </template>
    Test
  </BasePage>
</template>

<script>
import BasePage from "./BasePage.vue"
import ResourcePageMixin from "../mixins/ResourcePageMixin";

export default {
  name: "Movie",
  components: {BasePage},
  mixins: [ResourcePageMixin]
}
</script>

<style scoped>

</style>
