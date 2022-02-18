<template>
  <div>
    <p v-if="articlesError">Sorry, there's been an error</p>
    <ul>
      <li v-for="item in visibleArticles" v-bind:key="item.id">
        <a v-bind:href="item.link" target="blank">{{ item.title }}</a>
        <button @click="hideArticle(item.id)">Hide</button>
      </li>
    </ul>
    <Count v-if="showCount" />
    <button @click="updateArticles">Update Articles</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import useSWRV from 'swrv'
import Count from './components/Count.vue'
import fetcher from './fetcher.js'


export default {
  name: 'App',
  components: {
    Count,
  },
  setup() {
    const {
      data: articles, error: articlesError, mutate: mutateArticles,
    } = useSWRV('/articles', fetcher)

    const { data: hideList, mutate: mutateHideList } = useSWRV('hideList', () => [], {
      dedupingInterval: 0
    })

    const visibleArticles = computed(function() {
      if(articles.value === undefined) {
        return articles.value
      }  else {
        return articles.value.filter(a => hideList.value.indexOf(a.id) === -1)
      }
    })

    function hideArticle(id){
      mutateHideList(() => hideList.value.concat([id]))
    }

    async function updateArticles() {
      await fetch('http://localhost:3000/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Untitled - ' + new Date().toString(),
          author: 'Andy',
          link: 'https://vuemastery.com/blog',
        })
      })

      mutateArticles();
    }

    const showCount = ref(false)
    setTimeout(() => showCount.value = true, 3000)

    return {
      visibleArticles,
      articlesError,
      showCount,
      hideArticle,
      updateArticles,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
