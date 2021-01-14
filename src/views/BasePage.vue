<template>
  <div class="page-container">
    <h1>
      <slot name="title"></slot>
    </h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BasePage"
}
</script>

<style scoped>

</style>
