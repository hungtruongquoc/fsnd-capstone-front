<template>
  <BasePage @searchChanged="refreshList">
    <template v-slot:title>
      <div class="p-grid p-ai-center vertical-container">
        <ListTitleComponent text="Movies" :resourceCount="totalCount"/>
        <Badge severity="success" value="Filtered" v-if="hasFilters"/>
      </div>
    </template>
    <template v-slot:pageScopeAction v-if="canCreate">
      <Button v-tooltip="'Create a new movie'" @click="displayNewForm" v-show-button-text="'New Movie'"
              v-show-add-icon/>
    </template>
    <DataTable :value="movies" :lazy="true" :totalRecords="totalCount" :loading="isLoading" class="p-datatable-striped"
               dataKey="id" :filters="filters" @sort="onSort($event)" sortField="title" :sortOrder="1"
               :scrollable="tableScrollable" :scrollHeight="tableHeight"
               :paginator="true" :rows="perPage" @page="onPage($event)" :rowsPerPageOptions="[10, 25, 50]">
      <Column field="title" header="Title" :sortable="true"/>
      <Column field="release" header="Release Date" :sortable="true" headerClass="date-value-header">
        <template #body="slotProps">
          <div class="date-value">
            {{ convertToLocalTime(slotProps.data.release) }}
          </div>
        </template>
      </Column>
      <Column headerStyle="width: 16rem; text-align: center"
              bodyStyle="width: 16rem; text-align: center; overflow: visible">
        <template #body="slotProps">
          <RecordButtonSetComponent @delete-clicked="onDeleteClick(slotProps.data)"
                                    @edit-clicked="showUpdateDialog(slotProps.data)"
                                    :show-delete="can('delete:movie')" :show-edit="can('edit:movie')"/>
        </template>
      </Column>
    </DataTable>
    <BaseResourceDialogComponent :show-dialog="showNewForm" @cancel-button-clicked="closeNewForm"
                                 :show-loading="isLoading" :loading-message="loadingMessage"
                                 :is-save-button-disabled="saveButtonDisabled" @save-button-clicked="saveMovie"
                                 header-text="New Movie" cancel-text="Cancel" ok-text="Create">
      <MovieFormComponent @formValidChanged="updateButton" @formValueChanged="updateValue" :initial-info="updateMovie" />
    </BaseResourceDialogComponent>
  </BasePage>
</template>

<script>
import ResourcePageMixin from "../mixins/ResourcePageMixin"
import MovieFormComponent from "../components/MovieFormComponent"
import FormEventsMixin from "../mixins/FormEventsMixin"

export default {
  name: "Movie",
  components: {
    MovieFormComponent
  },
  mixins: [ResourcePageMixin, FormEventsMixin],
  data() {
    return {
      name: 'Movie Page',
      movies: null,
      searchField: 'title',
      updateMovie: null
    }
  },
  mounted() {
    this.sortField = 'title'
    this._getMovies()
  },
  methods: {
    onPage(event) {
      this.currentPage = event.page + 1
      this.perPage = event.rows
      this._getMovies()
    },
    onSort(event) {
      const {sortField, sortOrder} = event
      this.sortField = sortField
      this.sortOrder = sortOrder
      this._getMovies()
    },
    async _getMovies() {
      const {currentPage, perPage, sortField, sortOrder} = this
      this.isLoading = true
      const queryParams = {params: {page: currentPage, perPage, sortField, sortOrder: sortOrder > 0 ? 'asc' : 'desc'}}

      if (this.filters && this.filters.searchText) {
        queryParams.params.title = this.filters.searchText
      }

      try {
        const result = await this.axios.get('/movies', queryParams)
        if (result) {
          const {movies, currentPage, totalCount} = result
          this.movies = [...movies]
          this.currentPage = currentPage
          this.totalCount = totalCount
        } else {
          this.movies = []
          this._resetPaginationInfo()
        }
      } catch (e) {
        console.error(e)
        this.movies = null
        this._resetPaginationInfo()
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
        this._getMovies()
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
    },
    refreshList(value) {
      this._refreshResourceList(value, this._getMovies)
    },
    convertToLocalTime(timeValue) {
      if (timeValue) {
        return (new Date(timeValue)).toLocaleDateString()
      }
      return '-'
    },
    async _deleteMovie(data) {
      try {
        const result = await this._sendDeleteRequest('movies', data.id)
        if (result && result.success) {
          this._showDeleteSuccessToast(`Movie "${data.name}" was successfully deleted.`)
          await this._getMovies()
        }
      }
      catch (e) {
        console.error(e)
      }
    },
    onDeleteClick(data) {
      this._showDeleteConfirm(`DELETE movie "${data.title}"`, data, this._deleteMovie)
    },
    showUpdateDialog(data) {
      this.showNewForm = true
      data.releaseDate = new Date(data.release)
      this.updateMovie = data
    },
  },
  computed: {
    canCreate() {
      return this.can('create:movie')
    }
  }
}
</script>

<style lang="scss">
.date-value {
  text-align: center
}

.p-datatable {
  .p-datatable-thead {
    th {
      &.date-value-header {
        text-align: center
      }
    }
  }
}

</style>
