<template>
  <ElConfigProvider :locale="locale">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </ElConfigProvider>
</template>
<script lang="ts" setup>
import en from 'element-plus/dist/locale/en'
import zhCN from 'element-plus/dist/locale/zh-cn'
import { ElConfigProvider } from 'element-plus'
import { LOCALE_KEYS } from '@/locale'
import { useCommonStore } from '@/store/useCommonStore'

const store = useCommonStore()

const locales = {
  [LOCALE_KEYS.CN]: zhCN,
  [LOCALE_KEYS.EN]: en,
}

const locale = computed(() => locales[store.locale])
</script>

<style></style>
