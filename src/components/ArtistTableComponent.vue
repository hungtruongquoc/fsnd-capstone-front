<template>
  <DataTable :value="actors" :lazy="true" :totalRecords="totalCount" :loading="isLoading" class="p-datatable-striped"
             :scrollable="tableScrollable" :scrollHeight="tableHeight"
             @sort="onSort($event)" dataKey="id" :filters="filters" sortField="name" :sortOrder="1"
             :paginator="true" :rows="perPage" @page="onPage($event)" :rowsPerPageOptions="[10, 25, 50]">
    <Column field="name" header="Name" :sortable="true"/>
    <Column field="age" header="Age" :sortable="true" headerClass="number-value-header"
            headerStyle="text-align: right">
      <template #body="slotProps">
        <div class="number-value">
          {{ slotProps.data.age }}
        </div>
      </template>
    </Column>
    <Column header="Gender" :sortable="true" field="gender" filterMatchMode="equals">
      <template #filter>
        <MultiSelect v-model="filters['genders']" :options="genders" optionValue="id" optionLabel="label"
                     dataKey="id" @change="onFilterChanged($event)"
                     placeholder="Select a gender value" class="p-column-filter" :showClear="true"/>
      </template>
      <template #body="slotProps">
        {{ convertToGenderText(slotProps.data.gender) }}
      </template>
    </Column>
    <Column headerStyle="width: 16rem; text-align: center"
            bodyStyle="text-align: center; overflow: visible; width: 16rem">
      <template #body="slotProps">
        <RecordButtonSetComponent @delete-clicked="onDeleteClick(slotProps.data)"
                                  @selection-clicked="onSelectionClicked(slotProps.data)"
                                  @edit-clicked="onEditClick(slotProps.data)" :show-selection="showSelection"
                                  :show-delete="showDeleteButton" :show-edit="showEditButton"/>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import RecordButtonSetComponent from "../components/RecordButtonSetComponent";
import MultiSelect from 'primevue/multiselect'

export default {
  name: "ArtistTableComponent",
  components: {DataTable, Column, RecordButtonSetComponent, MultiSelect},
  props: {
    actors: {
      type: Array,
      default: () => []
    },
    tableScrollable: {
      type: Boolean,
      default: false
    },
    tableHeight: {
      type: String,
      default: '500px'
    },
    showDeleteButton: {
      type: Boolean,
      default: true
    },
    showEditButton: {
      type: Boolean,
      default: true
    },
    showSelection: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    totalCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      filters: {},
      perPage: 10,
      genders: [{id: 1, label: 'Male'}, {id: 2, label: 'Female'}, {id: 3, label: 'Unspecified'}],
    }
  },
  emits: [
    'sort-changed',
    'page-changed',
    'delete-clicked',
    'edit-clicked',
    'filter-changed',
    'artist-selected'
  ],
  methods: {
    convertToGenderText(genderValue) {
      const genderMap = ['Male', 'Female', 'Unspecified'];
      return genderMap[genderValue - 1];
    },
    onSort(data) {
      this.$emit('sort-changed', data)
    },
    onPage(data) {
      this.$emit('page-changed', data)
    },
    onFilterChanged() {
      const {filters, $emit} = this
      $emit('filter-changed', filters)
    },
    onDeleteClick(data) {
      this.$emit('delete-clicked', data)
    },
    onEditClick(data) {
      this.$emit('edit-clicked', data)
    },
    onSelectionClicked(data) {
      this.$emit('artist-selected', data)
    }
  }
}
</script>

<style scoped lang="scss">

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
