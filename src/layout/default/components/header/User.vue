<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="user-box flex items-center">
    <el-switch
      v-model="isDark"
      class="mr-1.5"
      inline-prompt
      :active-icon="Sunny"
      :inactive-icon="Moon"
      @change="changeTheme"
    />
    <img
      class="mr-1.5"
      @click="changeLanguage"
      src="../../../../assets/images/language.png"
      alt=""
    />
    <el-dropdown trigger="click" @command="onClickItem" popper-class="system-btn-dropdown">
      <div class="flex items-center text-2xl">
        <span class="current-role text-white">{{ currentRole }}</span>
        <el-icon class="text-white"><UserFilled /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <!-- <el-dropdown-item :command="EDIT_PROFILE">
            <el-icon class="mr-[6px]"><Edit /></el-icon>
            <span>Edit Profile</span>
          </el-dropdown-item> -->
          <el-dropdown-item :command="LOG_OFF_ITEM">
            <custom-icon name="logout" class="mr-[6px]" />
            <span>Logout</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="tsx" setup>
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import { useCommonStore } from '@/store/useCommonStore'
import { useAccessesStore } from '@/store/useAccesses'
import { LOCALE_KEYS } from '@/locale'

onMounted(() => {
  visible.value = !store.role
})

type RoleItem = {
  name: string
  icon?: string
  role?: string
}

const EDIT_PROFILE = {
  name: 'Edit Profile',
  icon: 'edit-profile',
}

const LOG_OFF_ITEM = {
  name: 'Logout',
  icon: 'logout',
}

const store = useCommonStore()
const { locale } = useI18n()
const currentRole = computed(() => store.role ?? '')

const handleLogout = () => {
  accesses.clearAccesses()
  store.exitLogin()
}

const visible = ref(false)

const accesses = useAccessesStore()

const onClickItem = (data: RoleItem) => {
  switch (data.name) {
    case LOG_OFF_ITEM.name:
      handleLogout()
      break
    case EDIT_PROFILE.name:
      break
    default:
      break
  }
}

const changeLanguage = () => {
  const isCN = store.locale === LOCALE_KEYS.CN
  const currentLang = isCN ? LOCALE_KEYS.EN : LOCALE_KEYS.CN
  locale.value = currentLang
  store.setLocale(currentLang)
}

const isDark = useDark()
const changeTheme = useToggle(isDark)
</script>

<style lang="scss" scoped>
.current-role {
  @apply mr-[8px] mt-0.5 text-[16px] font-semibold;
}

.user-box {
  margin-right: -4px;
  @apply p-1;
  @apply rounded;
  @apply cursor-pointer;
  // @apply hover:bg-[#22373f];
}
.system-btn-dropdown {
  // background-color: #303133 !important;
  // border-color: #444444 !important;

  .el-dropdown-menu {
    // @apply bg-[#303133];
    .el-dropdown-menu__item {
      @apply text-[12px] leading-[28px];

      &:not(.is-disabled):focus {
        @apply bg-[#0082d1] text-white;
      }
    }
  }

  .el-popper__arrow {
    &:before {
      // border-color: #444444 !important;
      // background-color: #303133 !important;
    }
  }
}
</style>
