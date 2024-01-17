<template>
  <div class="login-container">
    <div class="login-box h-14 min-h-80 w-72 min-w-24 bg-white p-5">
      <div class="title">
        <span>登录</span> <img class="ml-1 w-24" src="../../assets/images/logo.png" alt="" />
      </div>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules">
        <el-form-item label="" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="请输入用户名">
            <template #prefix>
              <el-icon class="el-input__icon"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="primary" @click="submitForm(ruleFormRef)">登 录</el-button>
        </el-form-item>
      </el-form>
      <div class="remember">忘记密码？</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '@/store/useCommonStore'
import commonAPIS from '@/api/common'

const router = useRouter()
const userStore = useCommonStore()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  userName: '',
  pass: '',
})

const checkName = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入用户名'))
  }
  callback()
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  userName: [{ validator: checkName, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      handleLogin()
    } else {
      return false
    }
  })
}

async function handleLogin() {
  try {
    const param = {
      username: ruleForm.userName,
      password: ruleForm.pass,
    }
    const { code, data } = await commonAPIS.login(param)
    if (code === 200) {
      const temp = {
        token: data.token,
        role: data.roles,
      }
      userStore.setToken(temp)
      router.push({ path: '/welcome' })
    }
  } catch (err) {
    console.log('loginError', err)
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: url('@/assets/images/login.png') no-repeat;
  background-size: cover;
}

.login-box {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  min-width: 200px;
  min-height: 250px;
  border-radius: 8px;
}
.title {
  font-size: 16px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
.remember {
  font-size: 12px;
  margin-top: 20px;
  text-align: center;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
}
</style>
