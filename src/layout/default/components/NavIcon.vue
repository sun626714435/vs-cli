<template>
  <div class="icon-box">
    <el-icon v-if="data.icon">
      <component :is="data.icon" />
    </el-icon>
    <template v-else-if="data.customIconName">
      <CustomIcon :name="data.customIconName" :font-size="24" />
    </template>
    <img v-else-if="data.img" :src="getImage(data.img)" alt="" />
  </div>
</template>
<script lang="ts" setup>
import CustomIcon from '@/components/CustomIcon.vue'
import { getImage } from '@/utils/common'

// import type { Menu } from '../../typing/common.d'

interface Props {
  data: any
}

defineProps<Props>()
</script>
<style lang="scss" scoped>
.icon-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin-right: 12px;
  overflow: hidden;

  img {
    width: 20px;
    height: 20px;
  }
}
</style>
