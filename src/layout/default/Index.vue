<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-container class="container">
    <el-header height="56px">
      <Header />
    </el-header>
    <el-container class="h-0">
      <el-aside width="auto">
        <Nav />
      </el-aside>
      <el-container>
        <div class="el-main-content flex items-start">
          <el-main ref="el" class="flex flex-col">
            <Suspense>
              <template #default>
                <router-view v-slot="{ Component }">
                  <keep-alive :include="keepAliveComponentNames">
                    <component class="content" :is="Component" />
                  </keep-alive>
                </router-view>
              </template>
              <template #fallback> Loading... </template>
            </Suspense>
          </el-main>
        </div>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Nav from './components/Nav.vue'
import Header from './components/Header.vue'
import { useCommonStore } from '@/store/useCommonStore'

const store = useCommonStore()

// const isMenuShow = computed(() => store.role)

const keepAliveComponentNames = computed(() => store.keepAliveComponentNames)
</script>

<style lang="scss">
.container {
  height: 100vh;
}
.el-header {
  color: #fff;
  // background: url('@/assets/images/header-bg.png') no-repeat;
  background: linear-gradient(to right, #fff, #3182ce);
  padding: 0 32px !important;
}

.el-main {
  padding: 0 !important;
  height: 100%;
}
.fullScreen {
  margin: 0 20px;
}
.quickNav {
  border-bottom: 1px solid #666;
}
.el-main-content {
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-lighter);
}
.el-aside {
  position: relative;
  z-index: 101;
  padding-top: 2px;
  overflow: hidden !important;
  box-shadow: 1px 8px 3px 0px rgba(0, 0, 0, 0.1);
}
</style>
