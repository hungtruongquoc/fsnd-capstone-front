export default {
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
  }
}
