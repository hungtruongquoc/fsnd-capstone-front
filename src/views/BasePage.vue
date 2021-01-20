<template>
  <div class="page-container p-pl-4 p-pr-4">
    <Toast position="top-center"/>
    <div class="page-title-container p-grid p-ai-center vertical-container">
      <h1 class="p-text-left p-pl-4 p-col-5">
        <slot name="title"></slot>
      </h1>
      <div class="search-container p-col-5">
        <span class="p-input-icon-left" style="display: block" v-if="showSearchBox">
          <i class="far fa-search fa-fw"/>
          <InputText type="text" placeholder="Search" v-model="searchText" @input="emitSearchValue"/>
        </span>
      </div>
      <div class="page-action-container p-col-2 p-text-right">
        <slot name="pageScopeAction"></slot>
      </div>
    </div>
    <div class="page-content-container">
      <slot></slot>
      <ConfirmDialog/>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";

export default {
  name: "BasePage",
  components: {InputText},
  props: {
    showSearchBox: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      searchText: null
    }
  },
  emits: [
    'search-changed'
  ],
  methods: {
    emitSearchValue() {
      this.$emit('search-changed', this.searchText)
    }
  }
}
</script>

<style scoped lang="scss">
.p-input-icon-left {
  & > svg {
    position: absolute;
    top: 50%;
    margin-top: -.5rem;
    left: .5em;
  }
  input {
    width: 100%;
  }
}
</style>
