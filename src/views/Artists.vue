<template>
  <BasePage @searchChanged="refreshList">
    <template v-slot:title>
      <div class="p-grid p-ai-center vertical-container">
        <ListTitleComponent text="Artists" :resourceCount="totalCount"/>
        <Badge severity="success" value="Filtered" v-if="hasFilters"/>
      </div>
    </template>
    <template v-slot:pageScopeAction>
      <Button @click="showNewDialog" v-tooltip="'Create a new artist'" v-show-button-text="'New Artist'"
              v-show-add-icon/>
    </template>
    <DataTable :value="actors" :lazy="true" :totalRecords="totalCount" :loading="isLoading" class="p-datatable-striped"
               @sort="onSort($event)" dataKey="id" :filters="filters"
               :paginator="true" :rows="perPage" @page="onPage($event)" :rowsPerPageOptions="[10, 25, 50]">
      <Column field="name" header="Name" :sortable="true"/>
      <Column field="age" header="Age" :sortable="true" headerClass="number-value-header">
        <template #body="slotProps">
          <div class="number-value">
            {{ slotProps.data.age }}
          </div>
        </template>
      </Column>
      <Column header="Gender" :sortable="true" field="gender" filterMatchMode="equals">
        <template #filter>
          <MultiSelect v-model="filters['status']" :options="statuses" optionValue="id" optionLabel="label"
                       dataKey="id" @change="onFilterChanged($event)"
                       placeholder="Select a gender value" class="p-column-filter" :showClear="true"/>
        </template>
        <template #body="slotProps">
          {{ convertToGenderText(slotProps.data.gender) }}
        </template>
      </Column>
    </DataTable>
    <BaseResourceDialogComponent :show-dialog="showNewArtist" @cancel-button-clicked="closeNewArtist"
                                 :loading-message="loadingMessage" :show-loading="isLoading"
                                 :is-save-button-disabled="saveButtonDisabled" ok-text="Create"
                                 @save-button-clicked="saveArtist" header-text="New Artist">
      <ArtistFormComponent @formValidChanged="updateButton" @formValueChanged="updateValue"/>
    </BaseResourceDialogComponent>
  </BasePage>
</template>

<script>
import BasePage from "./BasePage"
import Button from "primevue/button"
// import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import MultiSelect from 'primevue/multiselect'
import Badge from 'primevue/badge'
import ArtistFormComponent from "../components/ArtistFormComponent"
import ListTitleComponent from "../components/ListTitleComponent"
import BaseResourceDialogComponent from "../components/BaseResourceDialogComponent"
import ResourcePageMixin from "../mixins/ResourcePageMixin";

export default {
  name: "Artists",
  components: {
    BasePage,
    Button,
    // Dialog,
    ArtistFormComponent,
    DataTable,
    Column,
    ListTitleComponent,
    MultiSelect,
    Badge,
    BaseResourceDialogComponent
  },
  mixins: [ResourcePageMixin],
  data() {
    return {
      showNewArtist: false,
      statuses: [{id: 1, label: 'Male'}, {id: 2, label: 'Female'}, {id: 3, label: 'Unspecified'}],
    }
  },
  mounted() {
    this._getActors()
  },
  methods: {
    convertToGenderText(genderValue) {
      const genderMap = ['Male', 'Female', 'Unspecified'];
      return genderMap[genderValue - 1];
    },
    async _getActors() {
      const {currentPage, perPage, sortField, sortOrder} = this
      this.isLoading = true
      const queryParams = {params: {page: currentPage, perPage, sortField, sortOrder: sortOrder > 0 ? 'asc' : 'desc'}}

      if (this.filters && this.filters.status && Array.isArray(this.filters.status) && this.filters.status.length < 3) {
        const {filters: {status}} = this
        queryParams.params.status = [...status]
      }

      if (this.filters && this.filters.searchText) {
        queryParams.params.name = this.filters.searchText
      }

      try {
        const result = await this.axios.get('/actors', queryParams)
        if (result) {
          const {actors, currentPage, totalCount} = result
          this.actors = [...actors]
          this.currentPage = currentPage
          this.totalCount = totalCount
        }
      } catch (e) {
        console.error(e)
        this.actors = null
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
    onFilterChanged() {
      this._getActors()
    },
    showNewDialog() {
      this.showNewArtist = true
    },
    closeNewArtist() {
      this.showNewArtist = false
    },
    async saveArtist() {
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
    },
    refreshList(value) {
      this.filters.searchText = value
      this._getActors()
    }
  },
  computed: {
    hasFilters() {
      const keyArray = Object.keys(this.filters);
      return keyArray.length > 0 && keyArray.every(name => {
        if (Array.isArray(this.filters[name])) {
          return this.filters[name].length > 0
        }
        return !!this.filters[name]
      })
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
