
export const CrewServiceBuilder = (axiosInstance) => {
  return {
    fetch(page = 1, perPage = 10) {
      return axiosInstance.get('/crews', {params: {page, perPage}})
    },
    fetchAll() {
      return axiosInstance.get('/crews');
    }
  }
}
