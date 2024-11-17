<script setup lang="ts">
import {User, Lock} from '@element-plus/icons-vue'
import {reactive,ref} from 'vue'
import useUserStore from '@/store/modules/user.ts'
import {useRouter} from 'vue-router'
import {ElNotification} from 'element-plus'
let $router = useRouter()
const userStore = useUserStore()
const loginForm = reactive({username: 'admin', password: '111111'})
let loading = ref(false)
const login = async ()=>{
  loading.value = true
  try {
    await userStore.userLogin(loginForm)
    await $router.push('/')
    ElNotification({
      type: 'success',
      message: '登录成功',
    })
    loading.value = false
  } catch(error) {
    ElNotification({
      type: 'error',
      message: error,
    })
    loading.value = false
  }

}
</script>

<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form">
          <h1>Hello</h1>
          <p>Welcome to the Admin-Panel</p>
          <el-form-item>
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input :prefix-icon="Lock" type="password" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login-button" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login-container{
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background1.png") no-repeat ;
  background-size: cover;
  .login-form{
    position: relative;
    width: 70%;
    top: 25vh;
    background: url("@/assets/images/background1.png") no-repeat ;
    background-size: cover;
    padding: 36px;
    border-radius: 15px; /* 圆角 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影 */
    opacity: 1; /* 透明度 */
    h1{
      color: white;
      font-size: 36px;
    }
    p{
      color: white;
      font-size: 24px;
      margin: 20px 0;
    }
    .login-button{
      width: 100%;
    }

  }
}
</style>
