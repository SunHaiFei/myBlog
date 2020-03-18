<template>
  <div id="add-blog">
    <h2>添加博客</h2>
    <h3 v-if="isSuccess">博客添加成功</h3>
    <div v-if="!isSuccess">
      <label>博客标题</label>
      <input type="text" v-model="blog.title" required />
      <label>博客内容</label>
      <textarea v-model="blog.content"></textarea>
      <div id="checkboxes">
        <label>Jquery</label>
        <input type="checkbox" value="Jquery" v-model="blog.categories" />
        <label>Bootstrap</label>
        <input type="checkbox" value="Bootstrap" v-model="blog.categories" />
        <label>Vue</label>
        <input type="checkbox" value="Vue" v-model="blog.categories" />
      </div>
      <label>作者：</label>
      <input type="text" v-model="blog.author" required />
      <button @click.prevent="post" v-if="Blog ===undefined">添加博客</button>
      <button @click.prevent="put" v-if="Blog !== undefined">编辑博客</button>
    </div>

    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题：{{blog.title}}</p>
      <p>作者：{{blog.author}}</p>
      <p>博客内容：</p>
      <p>{{blog.content}}</p>
      <p>博客类型：</p>
      <ul>
        <li v-for="item of blog.categories" :key="item">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Blog: Object,
    id: String
  },
  created() {
    //只有传过来有数据的情况下,才进行复制,否则,保持原样
    this.Blog !== undefined ? (this.blog = this.Blog) : this.blog;
  },
  data() {
    return {
      blog: {
        title: "",
        content: "",
        categories: [],
        author: ""
      },
      isSuccess: false
    };
  },
  methods: {
    //添加博客
    post() {
      this.axios
        .post("/blog/", {
          params: {
            title: this.blog.title,
            content: this.blog.content,
            categories: this.blog.categories,
            author: this.blog.author
          }
        })
        .then(res => {
          this.isSuccess = true;
        });
    },
    // 编辑博客
    put() {
      this.axios
        .put("/blog/" + this.id, {
          params: {
            title: this.blog.title,
            content: this.blog.content,
            categories: this.blog.categories,
            author: this.blog.author
          }
        })
        .then(res => {
          this.isSuccess = true;
        });
    }
  }
};
</script>

<style scoped>
#add-blog * {
  box-sizing: border-box;
}
#add-blog {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}
label {
  display: block;
  margin: 20px 0 10px;
}

input[type="text"],
textarea {
  display: block;
  width: 100%;
  padding: 8px;
}
textarea {
  height: 200px;
}

#checkboxes label {
  display: inline-block;
  margin: 0;
}

#checkboxes input {
  display: inline-block;
  margin-right: 10px;
}
button {
  display: block;
  margin: 20px 0;
  background: crimson;
  color: #fff;
  border: 0;
  padding: 14px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}

#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}
h3 {
  margin-top: 10px;
}
</style>