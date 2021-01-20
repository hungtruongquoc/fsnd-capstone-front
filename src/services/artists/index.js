function convertNumberToSortDirection(numericValue) {
  if (1 === numericValue) {
    return 'asc'
  }
  return 'desc'
}


export const ArtistServiceBuilder = (axiosInstance) => {
  return {
    fetchArtists(queryParams) {
      return axiosInstance.get('/actors', {params: queryParams})
    },
    convertNumberToSortDirection,
    buildQueryStringObject(currentPage = 1, perPage = 10, sortField = 'name', sortDirection = 1) {
      return {
        page: currentPage,
        perPage,
        sortField,
        sortOrder: convertNumberToSortDirection(sortDirection)
      }
    }
  }
}
