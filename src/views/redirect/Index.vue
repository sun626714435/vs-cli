<template>
  <div
    class="flex min-h-80 items-center justify-center font-CS font-bold"
    style="height: 100vh; font-size: 28px"
  >
    <div class="mr-2 animate-spin" style="display: inline-block">⚙️</div>
    <i>正在跳转，请稍后…… / Redirecting, please wait a moment...</i>
  </div>
</template>
<script lang="ts" setup>
import { useCommonStore } from '@/store/useCommonStore'

const store = useCommonStore()
const route = useRoute()

onMounted(() => {
  store.setToken(route.query)
})
</script>
<style lang="scss" scoped></style>
