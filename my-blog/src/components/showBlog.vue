<template>
   <div id="show-blog" v-theme:column="'narrow'">
        <h1>博客总览</h1>
        <input type="text" placeholder="Search..." v-model="search"/>
        <div class="single-blog" v-for="(item,i) of filteredBlogs" :key="i">
          <router-link :to="`/blog/${item.id}`"> <h2 v-rainbow> {{item.params.title | to-uppercase}}</h2></router-link>
           <article>
              {{item.params.content | snippet}}
           </article>
        </div>
   </div>

</template>


<script>
export default {
    data(){
        return {
            list:[],
            search:''
        }
    },
    created(){
        this.axios.get('/blog')
        .then(res=>{
           // console.log(res.data)
            this.list = res.data.slice(0,10);
        })
        
    },
    computed:{
        filteredBlogs(){
            return this.list.filter(item=>{
                return item.params.title.match(this.search)
            })
        }
    }
}
</script>




<style>
#show-blog{
    max-width: 800px;
    margin: 0 auto;

}

.single-blog{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
}
article,h2,h1{
    word-wrap:break-word;
}


#show-blog a{
    color: #444;
    text-decoration: none;
}


input[type="text"]{
    padding: 8px 0;
    width: 100%;
    box-sizing: border-box;
}
</style>