<template>
  <div id="single-blog">
    <h1>{{blog.title}}</h1>
    <h3>{{blog.author}}</h3>
    <p>类型:{{blog.categories}}</p>
    <article>{{blog.content}}</article>
    <div>
      <span @click="edit">修改</span>
      <span @click="del">删除</span>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      blog: {}
    };
  },
  created() {
    this.axios.get("/blog/" + this.id).then(res => {
      // console.log(res)
      this.blog = res.data.params;
    });
  },
  methods:{
      del(){
          confirm("是否删除")
          this.axios.delete("/blog/" + this.id).then(res=>{
              alert("删除成功")
              this.$router.push("/home")
          })
      },
      edit(){
          this.$router.push({name:"About",params:{blog:this.blog,id:this.id}})
      }
  }
};
</script>


<style scoped>
#single-blog {
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background: #eee;
  border: 1px dotted #aaa;
}

span {
  position: absolute;
  bottom: 0;
  border-bottom: 2px solid crimson;
  cursor: pointer;
}

span:first-child{
    right: 0;
}

span:last-child{
    right: 40px;
}
</style>