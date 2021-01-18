<template>
  <Dialog :header="headerText" :visible="showDialog" :modal="true" :closeable="false" :closeOnEscape="false"
          :style="{width: dlgWidth}">
    <slot></slot>
    <template #footer>
      <div class="p-grid p-ai-center vertical-container p-jc-between">
        <div class="loading-container p-pl-2" :style="{'visibility': showLoading ? 'visible' : 'hidden'}">
          <slot name="loading-icon">
            <font-awesome-icon :icon="['far', 'spinner']" size="lg" spin/>
          </slot>
          {{ loadingMessage }}
        </div>
        <div class="button-container">
          <Button @click="emitCancelClick" class="p-button-text" :disabled="showLoading">
            <slot name="cancel-icon">
              <font-awesome-icon :icon="['far', 'times']" size="lg"/>
            </slot>
            <span class="p-ml-2">{{cancelText}}</span>
          </Button>
          <Button @click="emitSaveClick" autofocus :disabled="isSaveButtonDisabled || showLoading">
            <slot name="ok-icon">
              <font-awesome-icon :icon="['far', 'save']" size="lg"/>
            </slot>
            <span class="p-ml-2">{{okText}}</span>
          </Button>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog'
import Button from "primevue/button"

export default {
  name: "BaseResourceDialogComponent",
  components: {Dialog, Button},
  props: {
    loadingMessage: {
      type: String,
      default: 'Loading ...'
    },
    showLoading: {
      type: Boolean,
      default: false
    },
    isSaveButtonDisabled: {
      type: Boolean,
      default: true
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    dlgWidth: {
      type: String,
      default: '50vw'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    okText: {
      type: String,
      default: 'OK'
    },
    headerText: {
      type: String,
      default: 'Form'
    }
  },
  methods: {
    emitSaveClick() {
      this.$emit('save-button-clicked');
    },
    emitCancelClick() {
      this.$emit('cancel-button-clicked')
    }
  },
  emits: [
    'save-button-clicked',
    'cancel-button-clicked'
  ]
}
</script>

<style scoped>

</style>
