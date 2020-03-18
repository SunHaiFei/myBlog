<template>
  <div>
    <add-blog :Blog='blog' :id="id"></add-blog>
  </div>
</template>


<script>
import addBlog from "../components/addBlog"
export default {
  components:{
    'add-blog':addBlog
  },
  data(){
    return {
      blog:{},
      id:""
    }
  },
  created(){
   this.blog = this.$route.params.blog;
   this.id = this.$route.params.id
  }
  
}
</script>