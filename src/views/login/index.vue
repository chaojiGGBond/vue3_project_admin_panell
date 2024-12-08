<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user.ts'
import { useRouter,useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import {getTime} from '@/utils/time.ts'
import { rules } from 'eslint-plugin-vue'
const route = useRoute();
let $router = useRouter()
const userStore = useUserStore()
const loginForm = reactive({ username: 'admin', password: '111111' })
let loading = ref(false)
const validatorUsername = (rule: any, value: any, callback: any)=>{
  //rule为验证对象
  //value为文本信息
  //callback是错误返回
  if(!value){
    return callback(new Error(`Input can't be blank`))
  }
  else if(!/^[a-zA-Z0-9]{5,10}$/.test(value)){
    return callback(new Error(`Length should be 5 to 10`))
  }
  else callback() //验证通过
}
const validatePassword = (rule: any, value: any, callback: any)=>{
  if(!value){
    return callback(new Error(`Input can't be blank`))
  }
  else if(!/^[a-zA-Z0-9]{6,12}$/.test(value)){
    return callback(new Error(`Length should be 6 to 12`))
  }
  else callback()
}
let rules = ({
  username: [
    // { required: true, min: 5, max: 10, message: 'Length should be 5 to 10', trigger: 'blur' }
    {trigger: 'change', validator: validatorUsername},
  ],
  password: [
    // { required: true, min: 6, max: 12, message: 'Length should be 6 to 12', trigger: 'change' }
    {trigger: 'change', validator: validatePassword},
  ],
})
let loginFormRef = ref()
const login = async () => {
  //validate是一个函数，需要调用
  await loginFormRef.value.validate()
  loading.value = true
  try {
    await userStore.userLogin(loginForm)
    const redirectPath = route.query.redirect;
    await $router.push({ path: redirectPath ? redirectPath : '/' });
    ElNotification({
      type: 'success',
      message: 'login successfully',
      title: `Hi, Good ${getTime()}`
    })
    loading.value = false
  } catch (error) {
    ElNotification({
      type: 'error',
      message: 'login failed',
    })
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <el-row justify="space-evenly">
      <el-col :span="12" :xs="0">
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginFormRef">
          <h1>Hello</h1>
          <p>Welcome to the Admin-Panel</p>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login-button"
              type="primary"
              @click="login"
            >
              Login
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: rgb(245, 244, 239);
  background-size: cover;
  .login-form {
    position: relative;
    width: 70%;
    top: 25vh;
    background: url('@/assets/images/background1.png') no-repeat;
    background-size: cover;
    padding: 36px;
    border-radius: 15px; /* 圆角 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影 */
    opacity: 1; /* 透明度 */
    h1 {
      color: black;
      font-size: 36px;
      font-family: $title-font-style;
    }
    p {
      color: black;
      font-size: 24px;
      margin: 20px 0;
      font-family: $content-font-style;
    }
    .login-button {
      width: 100%;
      font-family:$content-font-style;
      font-size: 16px;
      background-color: rgb(193, 95, 61);
      border: 1px solid rgb(193, 95, 61);
    }
    .login-button:hover {
      background-color: rgb(198, 108, 76);
    }
  }
}
</style>
