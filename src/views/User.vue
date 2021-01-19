<template>
  <div class="user-profile-container p-p-4">
    <h1 class="p-text-left">User Profile</h1>
    <Divider/>
    <div class="permission-container">
      <h3>Permissions</h3>
      <div class="permission-list">
        <div class="p-grid entity-list">
          <h5 class="p-col-2"></h5>
          <h5 class="p-col">Actor</h5>
          <h5 class="p-col">Movie</h5>
          <h5 class="p-col">Crew</h5>
        </div>
        <div class="permission-item-info">
          <div class="permission-create p-grid">
            <h5 class="p-col-2">View</h5>
            <h5 class="p-col">
              <font-awesome-icon :icon="['fas', getIconName('view:actors')]" size="lg"/>
            </h5>
            <h5 class="p-col">
              <font-awesome-icon :icon="['fas', getIconName('view:movies')]" size="lg"/>
            </h5>
            <h5 class="p-col">
              <font-awesome-icon :icon="['fas', getIconName('update:crew')]" size="lg"/>
            </h5>
          </div>
          <div class="permission-create p-grid">
            <h5 class="p-col-2">Create</h5>
            <h5 class="p-col">
              <font-awesome-icon :icon="['fas', getIconName('create:actor')]" size="lg"/>
            </h5>
            <h5 class="p-col">
              <font-awesome-icon :icon="['fas', getIconName('create:movie')]" size="lg"/>
            </h5>
            <h5 class="p-col">
              <font-awesome-icon :icon="['fas', getIconName('update:crew')]" size="lg"/>
            </h5>
          </div>
          <div class="permission-update p-grid">
            <h5 class="p-col-2">Edit</h5>
            <h5 class="p-col">
              <font-awesome-icon :icon="['fas', getIconName('edit:actor')]" size="lg"/>
            </h5>
            <h5 class="p-col">
              <font-awesome-icon :icon="['fas', getIconName('edit:movie')]" size="lg"/>
            </h5>
            <h5 class="p-col">
            </h5>
          </div>
          <div class="permission-delete p-grid">
            <h5 class="p-col-2">Delete</h5>
            <h5 class="p-col">
              <font-awesome-icon :icon="['fas', getIconName('delete:actor')]" size="lg"/>
            </h5>
            <h5 class="p-col">
              <font-awesome-icon :icon="['fas', getIconName('delete:movie')]" size="lg"/>
            </h5>
            <h5 class="p-col">
              <font-awesome-icon :icon="['fas', getIconName('update:crew')]" size="lg"/>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Divider from 'primevue/divider';

export default {
  name: "User",
  components: {Divider},
  methods: {
    getIconName(permission) {
      return this.currentPermissions.includes(permission) ? 'check-circle' : 'minus'
    }
  }
}
</script>

<style scoped lang="scss">
.entity-list {
  text-align: center;
}
.permission-item-info {
  text-align: center;
}
</style>
