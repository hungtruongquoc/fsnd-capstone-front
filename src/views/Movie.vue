<template>
  <BasePage>
    <template v-slot:title>
      <ListTitleComponent text="Movies" :resourceCount="totalCount"/>
    </template>
    <template v-slot:pageScopeAction v-if="canCreate">
      <Button v-tooltip="'Create a new movie'" @click="displayNewForm" v-show-button-text="'New Movie'"
              v-show-add-icon/>
    </template>
    <BaseResourceDialogComponent :show-dialog="showNewForm" @cancel-button-clicked="closeNewForm"
                                 :show-loading="isLoading" :loading-message="loadingMessage"
                                 :is-save-button-disabled="saveButtonDisabled" @save-button-clicked="saveMovie"
                                 header-text="New Movie" cancel-text="Cancel" ok-text="Create">
      <MovieFormComponent @formValidChanged="updateButton" @formValueChanged="updateValue"></MovieFormComponent>
    </BaseResourceDialogComponent>
  </BasePage>
</template>

<script>
import BasePage from "./BasePage.vue"
import ResourcePageMixin from "../mixins/ResourcePageMixin"
import MovieFormComponent from "../components/MovieFormComponent"
import BaseResourceDialogComponent from "../components/BaseResourceDialogComponent"
import FormEventsMixin from "../mixins/FormEventsMixin"
import ListTitleComponent from "../components/ListTitleComponent";

export default {
  name: "Movie",
  components: {BaseResourceDialogComponent, MovieFormComponent, BasePage, ListTitleComponent},
  mixins: [ResourcePageMixin, FormEventsMixin],
  data() {
    return {
      name: 'Movie Page',
      movies: null
    }
  },
  mounted() {
    debugger;
    this._getMovies()
  },
  methods: {
    async _getMovies() {
      const {currentPage, perPage, sortField, sortOrder} = this
      this.isLoading = true
      const queryParams = {params: {page: currentPage, perPage, sortField, sortOrder: sortOrder > 0 ? 'asc' : 'desc'}}

      if (this.filters && this.filters.searchText) {
        queryParams.params.name = this.filters.searchText
      }

      try {
        const result = await this.axios.get('/movies', queryParams)
        if (result) {
          const {movies, currentPage, totalCount} = result
          debugger
          this.movies = [...movies]
          this.currentPage = currentPage
          this.totalCount = totalCount
        }
      } catch (e) {
        console.error(e)
        this.movies = null
      } finally {
        this.isLoading = false
      }
    },
    _onAfterCreateSuccess(result) {
      return () => {
        const {movie} = result
        this.$toast.add({
          severity: 'success',
          summary: 'New Movie Created',
          detail: `Movie "${movie.title}" was successfully inserted.`,
          life: 3000
        })
        this.postCloseCallback = null
        this._getActors()
      }
    },
    async saveMovie() {
      this.enableLoading('Creating new movie ...')
      try {
        this.formValue.releaseDate = this.formValue.releaseDate.getTime()
        const result = await this.axios.post('/movies', this.formValue)
        if (result) {
          this.closeNewForm();
          this.$nextTick(this._onAfterCreateSuccess(result))
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.disableLoading()
      }
    }
  },
  computed: {
    canCreate() {
      return this.can('create:movie')
    }
  }
}
</script>

<style scoped>

</style>
