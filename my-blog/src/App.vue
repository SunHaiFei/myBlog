<template>
  <div id="app">
    <blog-header v-if="$route.meta.isShow"></blog-header>
    <router-view/>
  </div>
</template>


<script>
import blogHeader from "./components/blogHeader"
export default {
  components:{
    blogHeader
  }
}
</script>


