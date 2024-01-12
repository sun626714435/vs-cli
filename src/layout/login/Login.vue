<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title">
        <span>登录</span> <img class="w-5" src="../../assets/images/logo.png" alt="" />
      </div>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules">
        <el-form-item label="" prop="userName">
          <el-input v-model.number="ruleForm.userName" placeholder="请输入用户名">
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

const router = useRouter()

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
      router.push({ path: '/welcome' })
    } else {
      return false
    }
  })
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
  width: 3rem;
  height: 3.5rem;
  min-width: 200px;
  min-height: 250px;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 0.3rem;
  background: #fff;
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
