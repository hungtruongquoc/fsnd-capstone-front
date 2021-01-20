<template>
  <BasePage>
    <template v-slot:title>Crews</template>
    <div class="crew-list-container p-grid p-pt-4" style="height: 800px; overflow-y: auto">
      <div v-for="movie in movies" :key="movie.id" class="p-col-6">
        <Card>
          <template v-slot:header>
            <div class="crew-header-container p-grid p-ai-center vertical-container p-p-3">
              <h4 class="p-col">{{ formatDate(movie.release) }}</h4>
            </div>
          </template>
          <template v-slot:title>
            {{ movie.title }}
          </template>
          <template v-slot:content>
            <div class="empty-crew-info p-text-center" v-if="!crews">
              <h5>
                <font-awesome-icon :icon="['far', 'info-circle']" size="lg"/>
                No actor or actress assigned.
              </h5>
              <div class="button container">
                <Button icon="far fa-user-plus" class="p-button-rounded p-button-info" v-tooltip="'Add member'"
                        @click="openPlacementDialog(movie)"
                />
              </div>
            </div>
          </template>
          <template v-slot:footer>
            <div class="button-container" v-if="crews">
              <Button icon="far fa-user-plus" class="p-button-rounded p-button-info" v-tooltip="'Add member'"
                      @click="openPlacementDialog(movie)"
              />
            </div>
          </template>
        </Card>
      </div>
      <BaseResourceDialogComponent :show-dialog="showPlacementDlg" dlg-width="60vw"
                                   ok-text="Assign" cancel-text="Close" header-text="Select Artists"
                                   @cancel-button-clicked="closePlacementDialog">
        <ArtistTableComponent :actors="artistItems" :total-count="artistTotalCount" :show-selection="true"
                              @sort-changed="onSort"
                              @artist-selected="chooseArtist" @page-changed="onPage" @filter-changed="onFilterChanged"
                              :show-delete-button="false" :show-edit-button="false"/>
      </BaseResourceDialogComponent>
    </div>
  </BasePage>
</template>

<script>
import BasePage from "./BasePage"
import Card from 'primevue/card'
import {formatDate} from "../helpers/DateFormatHelper"
import {ArtistServiceBuilder} from '../services/artists'
import {CrewServiceBuilder} from '../services/crew'
import {MovieServiceBuilder} from '../services/movie'
import BaseResourceDialogComponent from '../components/BaseResourceDialogComponent'
import ArtistTableComponent from "../components/ArtistTableComponent"

export default {
  name: "Crews",
  components: {BasePage, Card, BaseResourceDialogComponent, ArtistTableComponent},
  setup() {
    return {
      formatDate,
      ArtistServiceBuilder,
      CrewServiceBuilder,
      MovieServiceBuilder
    }
  },
  data() {
    return {
      movies: null,
      crews: null,
      showPlacementDlg: false,
      artistsList: null,
      selectedArtist: null,
      selectedMovie: null
    }
  },
  created() {
    this.artistService = this.ArtistServiceBuilder(this.axios)
    this.crewService = this.CrewServiceBuilder(this.axios)
    this.movieService = this.MovieServiceBuilder(this.axios)
  },
  mounted() {
    this._getMovies()
    this._getArtists()
    this._getCrews()
  },
  methods: {
    openPlacementDialog(selectedMovie) {
      this.showPlacementDlg = true
      this.selectedMovie = {...selectedMovie}
    },
    closePlacementDialog() {
      this.showPlacementDlg = false
      this.selectedArtist = []
      this.selectedMovie = null
    },
    onSort(data) {
      this.artistsList.sortField = data.sortField
      this.artistsList.sortOrder = data.sortOrder
      this._getArtists()
    },
    onPage(pageInfo) {
      this.artistsList.currentPage = pageInfo.page + 1
      this._getArtists()
    },
    onFilterChanged(data) {
      this._getArtists(data)
    },
    addArtist(artistId) {
      console.log(artistId)
    },
    chooseArtist(data) {
      if (!this.selectedArtist) {
        this.selectedArtist = []
      }
      this.selectedArtist.push(data)
      this.selectedArtist = JSON.parse(JSON.stringify(this.selectedArtist))
    },
    async _getArtists(filters = null) {
      const {artistService, artistsList} = this
      let page = 1
      let perPage = 10
      let sortField = 'name'
      let sortOrder = 1

      if (artistsList) {
        page = artistsList.currentPage
        perPage = artistsList.perPage
        sortField = artistsList.sortField
        sortOrder = artistsList.sortOrder
      }

      try {
        let queryParams = artistService.buildQueryStringObject(page, perPage, sortField, sortOrder)
        if (artistsList && artistsList.filters) {
          queryParams = {...queryParams, ...artistsList.filters}
        }
        if (filters) {
          queryParams = {...queryParams, ...filters}
        }

        const result = await artistService.fetchArtists(queryParams)
        this.artistsList = JSON.parse(JSON.stringify(result))
        this.artistsList.sortOrder = 'asc' === this.artistsList.sortOrder ? 1 : -1
      } catch (e) {
        console.error(e)
        this.artistsList = null
      }
    },
    async _getCrews() {
      try {
        const {crews} = await this.crewService.fetchAll()
        this.crews = [...crews]
      } catch (e) {
        console.error(e)
        this.crews = null
      }
    },
    async _getMovies() {
      try {
        const {movies} = await this.movieService.fetchAll()
        this.movies = [...movies]
      } catch (e) {
        console.error(e)
        this.movies = null
      }
    }
  },
  computed: {
    artistItems() {
      return this.artistsList && this.artistsList.actors ? this.artistsList.actors : []
    },
    artistTotalCount() {
      return this.artistsList && this.artistsList.totalCount ? this.artistsList.totalCount : 0
    }
  }
}
</script>

<style scoped>

</style>
