<template>
  <span class="p-buttonset">
    <Button type="button" class="p-button-secondary" v-if="showEdit"
            :v-tooltip="editTooltip" @click="$emit('edit-clicked')">
      <font-awesome-icon :icon="['far', 'edit']" fixed-width/>
    </Button>
    <Button type="button" class="p-button-danger" v-if="showDelete" @click="$emit('delete-clicked')"
            :v-tooltip="deleteTooltip">
      <font-awesome-icon :icon="['far', 'trash-alt']" fixed-width/>
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
    editTooltip: {
      type: String,
      default: 'Delete'
    },
    deleteTooltip: {
      type: String,
      default: 'Edit'
    }
  },
  emits: [
    'delete-clicked',
    'edit-clicked'
  ]
}
</script>

<style scoped>

</style>
