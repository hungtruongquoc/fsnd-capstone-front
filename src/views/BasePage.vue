<template>
  <div class="page-container">
    <h1 class="p-text-left p-pl-4">
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
