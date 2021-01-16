<template>
  <BasePage>
    <template v-slot:title>
      Artists
    </template>
  </BasePage>
</template>

<script>
import BasePage from "./BasePage";

export default {
  name: "Artists",
  components: {BasePage},
  mounted() {
    this.axios.get('/actors');
    console.log(this.$auth.token());
  }
}
</script>

<style scoped>

</style>
