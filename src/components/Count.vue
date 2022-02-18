<template>
  <div>
    <span>Article Count: {{ articles === undefined ? 0 : articles.length }}</span>
  </div>
</template>

<script>
import useSWRV from 'swrv'
import fetcher from '../fetcher.js'

export default {
  name: 'Count', // eslint-disable-line
  setup() {
    const { data: articles } = useSWRV('/articles', fetcher)

    return {
      articles
    }
  },
}
</script>
