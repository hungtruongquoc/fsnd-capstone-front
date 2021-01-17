<template>
  <BasePage>
    <template v-slot:title>
      Artists
    </template>
    <template v-slot:pageScopeAction>
      <Button @click="showNewDialog" v-tooltip="'Create a new artist'">
        <font-awesome-icon :icon="['far', 'plus-circle']" size="lg"/>
        <span class="p-ml-2">New Artist</span>
      </Button>
    </template>
    <Dialog header="New Artist" :visible="showNewArtist" :modal="true" :closeable="false" :closeOnEscape="false"
            :style="{width: '50vw'}">
      <ArtistFormComponent @formValidChanged="updateButton" @formValueChanged="updateValue"/>
      <template #footer>
        <div class="p-grid p-ai-center vertical-container p-jc-between">
          <div class="loading-container p-pl-2" :style="{'visibility': isLoading ? 'visible' : 'hidden'}">
            <font-awesome-icon :icon="['far', 'spinner']" size="lg" spin/>
            {{ loadingMessage }}
          </div>
          <div class="button-container">
            <Button @click="closeNewArtist" class="p-button-text" :disabled="isLoading">
              <font-awesome-icon :icon="['far', 'times']" size="lg"/>
              <span class="p-ml-2">Cancel</span>
            </Button>
            <Button @click="saveArtist" autofocus :disabled="saveButtonDisabled || isLoading">
              <font-awesome-icon :icon="['far', 'save']" size="lg"/>
              <span class="p-ml-2">Create</span>
            </Button>
          </div>
        </div>
      </template>
    </Dialog>
  </BasePage>
</template>

<script>
import BasePage from "./BasePage"
import Button from "primevue/button"
import Dialog from 'primevue/dialog'
import ArtistFormComponent from "../components/ArtistFormComponent";

export default {
  name: "Artists",
  components: {BasePage, Button, Dialog, ArtistFormComponent},
  data() {
    return {
      showNewArtist: false,
      saveButtonDisabled: true,
      formValue: null,
      isLoading: false,
      loadingMessage: null,
      postCloseCallback: null
    }
  },
  mounted() {
    this.axios.get('/actors');
  },
  methods: {
    onAfterCreateSuccess(data) {
      return () => {
        const {artist} = data
        this.$toast.add({
          severity: 'success',
          summary: 'New Artist Created',
          detail: `${artist.name} was successfully inserted.`,
          life: 3000
        })
        this.postCloseCallback = null
      }
    },
    enableLoading(message) {
      this.isLoading = true;
      this.loadingMessage = message;
    },
    disableLoading() {
      this.isLoading = false;
      this.loadingMessage = null;
    },
    showNewDialog() {
      this.showNewArtist = true
    },
    closeNewArtist() {
      this.showNewArtist = false
    },
    updateButton(value) {
      this.saveButtonDisabled = !value;
    },
    updateValue(value) {
      this.formValue = {...value};
    },
    saveArtist() {
      this.enableLoading('Creating new artist ...')
      this.axios.post('/actors', this.formValue).catch(console.error).then((data) => {
        if (data) {
          this.closeNewArtist();
          this.$nextTick(this.onAfterCreateSuccess(data))
        }
      }).finally(this.disableLoading)
    }
  }
}
</script>

<style scoped>

</style>
