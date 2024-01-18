<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="welcome-container">
    <div class="absolute right-28 top-1/2 text-3xl font-bold tracking-widest text-sky-700">
      您好，欢迎使用XXX系统
    </div>
  </div>
</template>
<style lang="scss" scoped>
.welcome-container {
  @apply flex-1;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(to bottom right, transparent, #ffffff),
    url('@/assets/images/rebbot.png');
  background-blend-mode: overlay;
  opacity: 0.8;
}
</style>
