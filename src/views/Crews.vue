<template>
  <BasePage>
    <template v-slot:title>Crews</template>
  </BasePage>
</template>

<script>
import BasePage from "./BasePage";

export default {
  name: "Crews",
  components: {BasePage},
  created() {
    console.log('Crew Page created');
  }
}
</script>

<style scoped>

</style>
