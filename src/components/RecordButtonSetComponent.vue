<template>
  <span class="p-buttonset">
    <Button type="button" class="p-button-secondary" v-if="showEdit"
            v-tooltip.left="editTooltip" @click="$emit('edit-clicked')">
      <font-awesome-icon :icon="['far', 'edit']" fixed-width/>
    </Button>
    <Button type="button" class="p-button-danger" v-if="showDelete" @click="$emit('delete-clicked')"
            v-tooltip="deleteTooltip">
      <font-awesome-icon :icon="['far', 'trash-alt']" fixed-width/>
    </Button>
    <Button type="button" class="p-button-info" v-if="showSelection" @click="$emit('selection-clicked')">
      <font-awesome-icon :icon="['far', 'plus']" fixed-width/>
    </Button>
  </span>
</template>

<script>
export default {
  name: "RecordButtonSetComponent",
  props: {
    showEdit: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    showSelection: {
      type: Boolean,
      default: false
    },
    editTooltip: {
      type: String,
      default: 'Edit'
    },
    deleteTooltip: {
      type: String,
      default: 'Delete'
    }
  },
  emits: [
    'delete-clicked',
    'edit-clicked',
    'selection-clicked'
  ]
}
</script>

<style scoped>

</style>
