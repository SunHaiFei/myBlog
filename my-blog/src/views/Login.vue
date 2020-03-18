<template>
  <div id="login">
    <div class="login-form">
      <ul>
        <li @click.prevent="loginLink">
          <router-link to="/">Login/</router-link>
        </li>
        <li @click.prevent="resignLink">
          <router-link to="/">Resign</router-link>
        </li>
      </ul>
      <!-- 登录  / 注册-->
      <input type="text" placeholder="Username" v-model="username" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="password" placeholder="Password" v-model="passwordRepeat" v-if="isShowResign" />
      <input type="text" placeholder="Phone" v-model="phone" v-if="isShowResign" />

      <button @click="login" v-if="!isShowResign">Login</button>
      <button @click="resign" v-if="isShowResign">Resign</button>
      <router-link to="#" v-if="!isShowResign">忘记密码?</router-link>
      <label v-if="isShowResign" for="xieyi">
        <input type="checkbox" id="xieyi" v-model="xieyi" />
        同意协议
      </label>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      passwordRepeat: "",
      phone: "",
      xieyi: Boolean,
      isShowResign: false
    };
  },
  methods: {
    login() {
      if (this.username !== "" && this.password !== "") {
        this.axios.get("/resign").then(res => {
          //console.log(res.data)
          let array = res.data;
          array.forEach(item => {
            if (this.username == item.username) {
              if (this.password == item.password) {
                alert("登录成功");
                localStorage.setItem("username", this.username);
                localStorage.setItem("isLogin", true);
                this.$router.push("/home");
              } else {
                alert("密码不正确");
              }
            }
          });
        });
      } else {
        alert("用户名或密码空");
      }
    },
    resign() {
      //基础规则
      if (
        this.username !== "" &&
        this.password !== "" &&
        this.passwordRepeat !== "" &&
        this.phone !== ""
      ) {
        // 密码不能重复
        if (this.password !== this.passwordRepeat) {
          alert("两次密码不一致");
          return;
        }
        //协议要勾选
        if (!this.xieyi) {
          alert("未勾选协议");
          return;
        }
        //发送
        this.axios
          .post("/resign", {
            username: this.username,
            password: this.password,
            passwordRepeat: this.passwordRepeat,
            phone: this.phone
          })
          .then(res => {
            console.log(res);
            alert("注册成功");
          });
      }
    },
    resignLink() {
      this.isShowResign = true;
    },
    loginLink() {
      this.isShowResign = false;
    }
  },
  watch: {
    xieyi() {
      console.log(this.xieyi);
    }
  }
};
</script>

<style scoped>
#login {
  position: relative;
  padding: 0;
  margin: 0;
  height: 100vh;
  background-image: linear-gradient(to top, #9890e3 0%, #b1f4cf 100%);
}

.login-form {
  width: 450px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-225px, -225px);
  text-align: center;
  background-image: linear-gradient(to top, #9890e3 0%, #b1f4cf 100%);
}

.login-form h1 {
  margin-top: 10px;
}
input[type="text"],
input[type="password"] {
  display: block;
  width: 300px;
  margin: 10px auto;
  border: none;
  border-bottom: 1px solid #9890e3;
  outline: none;
  background: transparent;
}

button {
  width: 100px;
  padding: 10px 0;
  background-image: linear-gradient(to top, #9890e3 0%, #b1f4cf 100%);
  border: 0;
  outline: none;
  color: #fff;
  border-radius: 8px;
  margin: 20px 0;
}

a {
  color: #fff;
  text-decoration: none;
  margin-left: 10px;
  font-size: 14px;
}

ul {
  list-style: none;
  padding: 0;
}
li {
  display: inline-block;
}

ul > li > a {
  color: #000;
  font-size: 36px;
}
</style>





