<template>
  <div class="page-container p-pl-4 p-pr-4">
    <Toast position="top-center" />
    <div class="page-title-container p-grid p-ai-center vertical-container">
      <h1 class="p-text-left p-pl-4 p-col">
        <slot name="title"></slot>
      </h1>
      <div class="page-action-container p-col p-text-right">
        <slot name="pageScopeAction"></slot>
      </div>
    </div>
    <div class="page-content-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasePage"
}
</script>

<style scoped>

</style>
