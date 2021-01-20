<template>
  <BasePage>
    <template v-slot:title>Crews</template>
    <div class="crew-list-container p-grid p-pt-4" style="height: 800px; overflow-y: auto">
      <div v-for="movie in movies" :key="movie.id" class="p-col-6">
        <Card>
          <template v-slot:header>
            <div class="crew-header-container p-grid p-ai-center vertical-container p-p-3">
              <h4 class="p-col"><span class="p-text-normal">Released </span> {{ formatDate(movie.release) }}</h4>
              <h4 class="p-text-right p-col"><span class="p-text-normal">Id </span> {{ movie.id }}</h4>
            </div>
          </template>
          <template v-slot:title>
            {{ movie.title }}
          </template>
          <template v-slot:content>
            <h4 v-show="getCrewCount(movie.id) > 0">
              {{ getCrewCount(movie.id) }} member(s)
            </h4>
            <div class="empty-crew-info p-text-center" v-if="getCrewCount(movie.id) < 1">
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
            <div class="button-container" v-if="getCrewCount(movie.id) > 0">
              <Button icon="far fa-user-plus" class="p-button-rounded p-button-info" v-tooltip="'Add member'"
                      @click="openPlacementDialog(movie)"
              />
            </div>
          </template>
        </Card>
      </div>
      <BaseResourceDialogComponent :show-dialog="showPlacementDlg" dlg-width="60vw" :is-save-button-disabled="false"
                                   ok-text="Assign" cancel-text="Close" :header-text="dialogTitle"
                                   @cancel-button-clicked="closePlacementDialog" @save-button-clicked="addArtist">
        <div class="list-filter-container p-grid p-m-2 p-ai-center vertical-container">
          <Chip v-for="item in selectedArtists" :label="item.name" :key="item.id" icon="far fa-user fa-fw"
                :removable="true" @remove="removeArtist(item)"/>
        </div>
        <ArtistTableComponent :actors="artistItems" :total-count="artistTotalCount" :show-selection="true"
                              :show-delete-button="false" :show-edit-button="false"
                              :show-remove="true" :toggle-selection-func="isArtistSelected"
                              @sort-changed="onSort" @artist-selected="chooseArtist" @page-changed="onPage"
                              @filter-changed="onFilterChanged" @remove-clicked="removeArtist"/>
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
import Chip from 'primevue/chip';

export default {
  name: "Crews",
  components: {BasePage, Card, BaseResourceDialogComponent, ArtistTableComponent, Chip},
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
      selectedArtists: null,
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
      this.selectedArtists = []
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
    async addArtist() {
      const {selectedMovie, selectedArtists} = this
      if (selectedMovie) {
        try {
          const result = await this.axios.post('/crews', {
            'movie_id': selectedMovie.id,
            'artists': selectedArtists ? selectedArtists.map(item => item.id) : []
          })
          if (result) {
            this.$toast.add({
              severity: 'success',
              summary: `Placement Completed`,
              detail: `Crew list was updated successfully`,
              life: 3000
            })
            this._getCrews()
          }
        }
        catch(e) {
          console.error(e)
          this.$toast.add({
            severity: 'error',
            summary: 'Placement Failed',
            detail: `Crew list cannot be updated. Please try again later`,
            life: 3000
          })
        }
        finally{
          this.closePlacementDialog()
        }
      }
    },
    removeArtist(data) {
      if (this.selectedArtists) {
        const {selectedArtists} = this
        this.selectedArtists = JSON.parse(JSON.stringify(selectedArtists.filter(item => item.id !== data.id)))
      }
    },
    chooseArtist(data) {
      if (!this.selectedArtists) {
        this.selectedArtists = []
      }
      this.selectedArtists.push(data)
      this.selectedArtists = JSON.parse(JSON.stringify(this.selectedArtists))
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
    },
    isArtistSelected(artist) {
      debugger
      return artist.selected
    },
    getCrewCount(movieId) {
      if (this.crews) {
        const found = this.crews.filter(member => member.movieId === movieId)
        if (found) {
          return found.length
        }
      }
      return 0
    }
  },
  computed: {
    artistItems() {
      const {artistsList, selectedArtists} = this;
      if (artistsList && artistsList.actors) {
        const list = artistsList.actors.map(actor => {
          if (selectedArtists) {
            actor.selected = selectedArtists.some(item => item.id === actor.id)
          }
          return actor
        })
        if (selectedArtists) {
          return list.filter(item => !item.selected)
        }
        return list
      }
      return []
    },
    artistTotalCount() {
      return this.artistsList && this.artistsList.totalCount ? this.artistsList.totalCount : 0
    },
    dialogTitle() {
      const {selectedArtists} = this
      const artistCount = selectedArtists && selectedArtists.length > 0 ? ` - ${selectedArtists.length} Selected` : ''
      return `Select Artist ${artistCount}`
    }
  }
}
</script>

<style scoped>

</style>
