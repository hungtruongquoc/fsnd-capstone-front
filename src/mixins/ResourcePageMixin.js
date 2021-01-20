import Badge from 'primevue/badge'
import BasePage from "../views/BasePage"
import DataTable from 'primevue/datatable'
import BaseResourceDialogComponent from "../components/BaseResourceDialogComponent"
import ListTitleComponent from "../components/ListTitleComponent"
import RecordButtonSetComponent from "../components/RecordButtonSetComponent";
import Column from 'primevue/column'

export default {
  components: {
    BasePage,
    Badge,
    DataTable,
    BaseResourceDialogComponent,
    ListTitleComponent,
    RecordButtonSetComponent,
    Column
  },
  data() {
    return {
      isLoading: false,
      showNewForm: false,
      saveButtonDisabled: true,
      formValue: null,
      loadingMessage: null,
      currentPage: 1,
      actors: null,
      totalCount: 0,
      perPage: 10,
      sortField: 'name',
      sortOrder: 1,
      filters: {},
      tableScrollable: false,
      tableHeight: '700px'
    }
  },
  methods: {
    displayNewForm() {
      this.showNewForm = true;
    },
    closeNewForm() {
      this.showNewForm = false;
    },
    updateButton(value) {
      this.saveButtonDisabled = !value;
    },
    updateValue(value) {
      this.formValue = {...value};
    },
    enableLoading(message) {
      this.isLoading = true;
      this.loadingMessage = message;
    },
    disableLoading() {
      this.isLoading = false;
      this.loadingMessage = null;
    },
    _showDeleteConfirm(header, data, acceptCallback) {
      this.$confirm.require({
        message: 'Are you sure you want to proceed?',
        header,
        acceptLabel: 'Delete',
        acceptIcon: `fal fa-trash-alt`,
        rejectIcon: `fal fa-times`,
        acceptClass: 'p-button-danger',
        icon: `fal fa-exclamation-circle`,
        accept: () => acceptCallback(data)
      });
    },
    _refreshResourceList(value, dataCallback) {
      this.filters.searchText = value
      dataCallback()
    },
    _resetPaginationInfo() {
      this.currentPage = 1
      this.totalCount = 0
    },
    _showDeleteSuccessToast(message) {
      this.$toast.add({
        severity: 'success',
        summary: `Delete Success`,
        detail: message,
        life: 3000
      })
    },
    _sendDeleteRequest(resource, id) {
      return this.axios.delete(`/${resource}/${id}`)
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
