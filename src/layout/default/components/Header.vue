<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="box flex justify-between">
    <div class="flex items-center">
      <img @click="onClick" class="logo" src="../../../assets/images/logo.png" alt="" />
    </div>
    <div class="flex items-center justify-end gap-6">
      <User />
    </div>
  </div>
</template>
<script lang="ts" setup>
import User from '@/layout/default/components/header/User.vue'
import { paths } from '@/router/paths'

const router = useRouter()

const onClick = () => {
  router.push({ path: paths.welcome })
}
</script>
<style lang="scss" scoped>
.box {
  height: 100%;
}
.logo {
  max-width: 100%;
  height: 40px;
}
</style>
