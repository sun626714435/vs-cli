<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex h-full flex-col items-center justify-center bg-white">
    <img src="../..assets/images/403.png" alt="403" class="mb-4" />
    <p class="text-primary-content font-CS font-normal leading-6">抱歉，您无权访问当前页面。</p>
    <p class="text-primary-content font-CS font-bold leading-6">
      Sorry, you don't have access to this page.
    </p>
    <el-button type="primary" class="mt-6" @click="onBack">Back to Home</el-button>
  </div>
</template>

<script lang="ts" setup>
import { goTo } from '@/utils/router'

const onBack = () => goTo('/welcome')
</script>
