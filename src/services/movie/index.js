
export const MovieServiceBuilder = (axiosInstance) => {
  return {
    fetch(page = 1, perPage = 10) {
      return axiosInstance.get('/movies', {params: {page, perPage}})
    },
    fetchAll() {
      return axiosInstance.get('/movies', {params: {getAll: true}});
    }
  }
}
