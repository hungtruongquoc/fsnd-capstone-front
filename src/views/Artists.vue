<template>
  <BasePage @searchChanged="refreshList">
    <template v-slot:title>
      <div class="p-grid p-ai-center vertical-container">
        <ListTitleComponent text="Artists" :resourceCount="totalCount"/>
        <Badge severity="success" value="Filtered" v-if="hasFilters"/>
      </div>
    </template>
    <template v-slot:pageScopeAction v-if="can('create:actor')">
      <Button @click="showNewDialog" v-tooltip="'Create a new artist'"
              v-show-button-text="'New Artist'" v-show-add-icon/>
    </template>
    <ArtistTableComponent :actors="actors" @page-changed="onPage" :total-count="totalCount"
                          @filter-changed="onFilterChanged" @sort-changed="onSort"
                          @delete-clicked="onDeleteClick" @edit-clicked="showUpdateDialog"/>
    <BaseResourceDialogComponent :show-dialog="showNewArtist" @cancel-button-clicked="closeNewArtist"
                                 :loading-message="loadingMessage" :show-loading="isLoading"
                                 :is-save-button-disabled="saveButtonDisabled"
                                 :ok-text="!!updateArtist ? 'Update': 'Create'"
                                 @save-button-clicked="saveArtist" header-text="New Artist">
      <ArtistFormComponent @formValidChanged="updateButton" @formValueChanged="updateValue"
                           :initial-info="updateArtist"/>
    </BaseResourceDialogComponent>
  </BasePage>
</template>

<script>
import ArtistFormComponent from "../components/ArtistFormComponent"
import ResourcePageMixin from "../mixins/ResourcePageMixin"
import ArtistTableComponent from '../components/ArtistTableComponent'
import {ArtistServiceBuilder} from '../services/artists'

export default {
  name: "Artists",
  components: {
    ArtistFormComponent,
    ArtistTableComponent
  },
  mixins: [ResourcePageMixin],
  setup() {
    return {
      ArtistServiceBuilder
    }
  },
  data() {
    return {
      showNewArtist: false,
      updateArtist: null,
      filters: {}
    }
  },
  mounted() {
    this.artistService = this.ArtistServiceBuilder(this.axios)
    this._getActors()
  },
  methods: {
    convertToGenderText(genderValue) {
      const genderMap = ['Male', 'Female', 'Unspecified'];
      return genderMap[genderValue - 1];
    },
    async _deleteArtist(data) {
      try {
        const result = await this._sendDeleteRequest('actors', data.id)
        if (result && result.success) {
          this._showDeleteSuccessToast(`${data.name} was successfully deleted.`)
          await this._getActors()
        }
      } catch (e) {
        console.error(e)
      }
    },
    async _getActors() {
      const {currentPage, perPage, sortField, sortOrder, artistService, filters} = this
      this.isLoading = true
      const queryParams = {page: currentPage, perPage, sortField, sortOrder: artistService.convertNumberToSortDirection(sortOrder)}

      if (filters && filters.genders && Array.isArray(filters.genders) && filters.genders.length < 3) {
        const {filters: {genders}} = this
        queryParams.genders = [...genders]
      }
      debugger
      if (this.filters && this.filters.searchText) {
        queryParams.name = this.filters.searchText
      }

      try {
        const result = await this.artistService.fetchArtists(queryParams)
        if (result) {
          const {actors, currentPage, totalCount} = result
          this.actors = [...actors]
          this.currentPage = currentPage
          this.totalCount = totalCount
        } else {
          this.actors = []
          this._resetPaginationInfo()
        }
      } catch (e) {
        console.error(e)
        this.actors = null
        this._resetPaginationInfo()
      } finally {
        this.isLoading = false
      }
    },
    onPage(event) {
      this.currentPage = event.page + 1
      this.perPage = event.rows
      this._getActors()
    },
    onSort(event) {
      const {sortField, sortOrder} = event
      this.sortField = sortField
      this.sortOrder = sortOrder
      this._getActors()
    },
    onAfterCreateSuccess(data) {
      return () => {
        const {artist} = data
        this.$toast.add({
          severity: 'success',
          summary: 'New Artist Created',
          detail: `${artist.name} was successfully inserted.`,
          life: 3000
        })
        this._getActors()
      }
    },
    onAfterUpdateSuccess(data) {
      return () => {
        const {artist} = data
        this.$toast.add({
          severity: 'success',
          summary: 'Artist Updated',
          detail: `${artist.name} was successfully updated.`,
          life: 3000
        })
        this._getActors()
      }
    },
    onFilterChanged(filter) {
      this.filters = {...filter}
      this._getActors()
    },
    onDeleteClick(data) {
      this._showDeleteConfirm(`DELETE artist "${data.name}"`, data, this._deleteArtist)
    },
    showNewDialog() {
      this.showNewArtist = true
    },
    showUpdateDialog(data) {
      this.showNewArtist = true
      this.updateArtist = data
    },
    closeNewArtist() {
      this.showNewArtist = false
    },
    async saveArtist() {
      if (this.updateArtist) {
        this.enableLoading(`Updating the artist ${this.updateArtist.name} ...`)
        try {
          const result = await this.axios.patch(`/actors/${this.updateArtist.id}`, this.formValue)
          if (result) {
            this.closeNewArtist()
            this.$nextTick(this.onAfterUpdateSuccess(result))
          }
        }  catch (error) {
          console.error(error)
        } finally {
          this.disableLoading()
        }
      }
      else {
        this.enableLoading('Creating new artist ...')
        try {
          const result = await this.axios.post('/actors', this.formValue)
          if (result) {
            this.closeNewArtist();
            this.$nextTick(this.onAfterCreateSuccess(result))
          }
        } catch (error) {
          console.error(error)
        } finally {
          this.disableLoading()
        }
      }
    },
    refreshList(value) {
      this._refreshResourceList(value, this._getActors)
    }
  }
}
</script>

<style lang="scss">
.number-value {
  text-align: right
}

.p-datatable {
  .p-datatable-thead {
    th {
      &.number-value-header {
        text-align: right
      }
    }
  }
}
</style>
