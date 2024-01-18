<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex h-full flex-col items-center justify-center bg-white">
    <img src="../assets/404.png" alt="404" class="mb-4" />
    <p class="text-primary-content font-CS font-normal leading-6">抱歉，您访问的页面未找到。</p>
    <p class="text-primary-content font-CS font-bold leading-6">
      Sorry, the page you visited does not exist.
    </p>
    <el-button type="primary" class="mt-6" @click="onBack">Back to Home</el-button>
  </div>
</template>

<script lang="ts" setup>
import { goTo } from '@/utils/router'

const onBack = () => goTo('/welcome')
</script>
