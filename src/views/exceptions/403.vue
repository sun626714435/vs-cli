<template>
  <div class="flex h-full flex-col items-center justify-center bg-white">
    <img src="../assets/403.png" alt="403" class="mb-4" />
    <p class="font-CS font-normal leading-6 text-primary-content">抱歉，您无权访问当前页面。</p>
    <p class="font-CS font-bold leading-6 text-primary-content">
      Sorry, you don't have access to this page.
    </p>
    <el-button type="primary" class="mt-6" @click="onBack">Back to Home</el-button>
  </div>
</template>

<script lang="ts" setup>
import { goTo } from '@/utils/router'

const onBack = () => goTo('/welcome')
</script>
