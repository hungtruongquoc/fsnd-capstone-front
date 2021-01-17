<template>
  <div class="p-mr-2">
    {{text}} <span v-if="resourceCount > 0"> - {{resourceCount}} item(s)</span>
  </div>
</template>

<script>
export default {
  name: "ListTitleComponent",
  props: {
    text: String,
    resourceCount: Number
  }
}
</script>

<style scoped>

</style>
