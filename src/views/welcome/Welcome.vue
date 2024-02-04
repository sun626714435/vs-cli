<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="welcome-container">
    <el-watermark :content="[$t('welUser')]">
      <div style="height: calc(100vh - 56px)">
        <div
          class="absolute right-28 top-1/2 text-3xl font-bold italic tracking-widest text-sky-700"
        >
          {{ $t('welcome') }}
        </div>
      </div>
    </el-watermark>
  </div>
</template>
<style lang="scss" scoped>
.welcome-container {
  @apply flex-1;
  // background-size: cover;
  // background-position: center;
  // background-image: linear-gradient(to bottom right, transparent, #ffffff),
  //   url('@/assets/images/rebbot.png');
  // background-blend-mode: overlay;
  // opacity: 0.8;
}
</style>
