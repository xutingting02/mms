<template>
  <div>
    <h1>医疗管理系统</h1>
    <el-row>
      <el-col :span="6" :offset="9">
        <div class="login">
          <el-input v-model="username" placeholder="请输入用户名"></el-input>
          <el-input v-model="password" placeholder="请输入密码"  type="password"></el-input>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="register">注册</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login, register } from '@/api/login'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      let userInfo = {
        username: this.username,
        password: this.password
      }
      login(userInfo).then((res) => {
        // 细化登录
        // if (res.success) {
        //   this.$router.push('/manage/dashboard')
        // }

        if (res.success) {
          sessionStorage.setItem('demo-token', res.token)
          this.$message({
            type: 'success',
            message: '登录成功'
          })
          this.$router.push('/manage/dashboard')
        } else {
          this.$message.error(res.info)
          sessionStorage.setItem('demo-token', null)
        }
      })
    },
    register () {
      let userInfo = {
        username: this.username,
        password: this.password
      }
      register(userInfo).then((res) => {
        // 细化登录
        if (res.success) {
          this.$router.push('/manage/dashboard')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.login .el-input {
    margin: 15px 0;
}
</style>
