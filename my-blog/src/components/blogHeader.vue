<template>
  <div id="nav">
    <ul>
      <li>
        <router-link to="/home" exact>博客</router-link>
      </li>
      <li>
        <router-link to="/about" exact>写博客</router-link>
      </li>
    </ul>
    <span>欢迎: {{username}}</span>
    <router-link to="/" exact>退出</router-link>
  </div>
</template>


<script>
export default {
  data(){
    return {
      username:""
    }
  },
  created(){
   //console.log( localStorage.getItem("username"))
   this.username = localStorage.getItem("username")
  }
};
</script>

<style scoped>
ul{
    list-style: none;
    text-align: center;
    margin: 0;
}
li{
    display: inline-block;
    margin: 0 10px;
}
a{
    color: #fff;
    text-decoration: none;
}
#nav{
    background: crimson;
    padding: 30px 0;
    margin-bottom: 40px;
    position: relative;
}
.router-link-active{
    background: rgba(255, 255, 255, .8);
    color: #444;
    padding: 10px;
    border-radius: 4px;
}

#nav>a{
  position: absolute;
  top: 25%;
  right: 40px;
}

#nav>span{
  position: absolute;
  top: 25%;
  right: 80px;
}



</style>