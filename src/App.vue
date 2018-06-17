<template>
  <section>
    <b-loading :is-full-page="true" :active.sync="isLoadingFromHttp$" :can-cancel="true"></b-loading>
    <b-table 
      :data="dataFromApi$"
      :paginated="true"
      :per-page="5"
      :current-page.sync="currentPage"
      default-sort-direction="asc"
      default-sort="id"
      >
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" sortable numeric>
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="joke" label="Joke" sortable>
          {{replaceQuot(props.row.joke)}} 
        </b-table-column>

        <b-table-column label="Categories">
          {{ getCategories(props.row.categories) }}
        </b-table-column>
      </template>
      <template slot="footer">
        <div class="columns">
          <div class="column">
          </div>
          <div class="column has-text-centered">
            <a class="button is-success" v-stream:click="clickOnLoad$">Load random jokes</a>
          </div>
          <div class="column">
          </div>
        </div>
      </template>
    </b-table>
  </section>
</template>

<script>
import {Observable} from 'rxjs/Rx'

const JOKES_URL = 'https://api.icndb.com/jokes/random/15'

export default {
  name: 'app',
  domStreams: ["clickOnLoad$"],
  data(){
    return {
      currentPage: 1
    }
  },
  subscriptions(){
    const createLoader = url => Observable.from(
      this.$http.get(url)
    ).pluck('data','value')

    const dataFromApi$ = this.clickOnLoad$
        .mapTo(JOKES_URL)
        .exhaustMap(createLoader)
        .catch(err => Observable.of([]))
        .share()

    const isLoadingFromHttp$ = Observable.merge(
      this.clickOnLoad$.mapTo(true),
      dataFromApi$.mapTo(false)
    ).startWith(false)

    return {
      dataFromApi$,
      isLoadingFromHttp$,
    }
  },
  methods: {
    getCategories(categories){
      var categoriesString = ''
      categories.forEach((item) => {
        categoriesString += ' ' + item
      })
      return categoriesString
    },
    replaceQuot(text){
      return text.replace(/&quot;/g, '\"')
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
