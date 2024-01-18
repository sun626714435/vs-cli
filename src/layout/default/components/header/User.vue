<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="user-box flex items-center">
    <el-dropdown trigger="click" @command="onClickItem" popper-class="system-btn-dropdown">
      <div class="flex items-center">
        <span class="current-role">{{ currentRole }}</span>
        <CustomIcon :font-size="24" class="mr-2" name="user" />
        <span class="text-md mr-2 mt-0.5 font-CS font-normal leading-4 text-white">
          {{ currentName }}
        </span>
        <CustomIcon :font-size="16" name="arrow-down" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :command="EDIT_PROFILE">
            <custom-icon name="edit-profile" class="mr-[6px]" />
            <span>Edit Profile</span>
          </el-dropdown-item>
          <el-dropdown-item :command="SELECT_ROLE">
            <custom-icon name="select-role" class="mr-[6px]" />
            <span>Select Role</span>
          </el-dropdown-item>
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
import qs from 'qs'

import { paths } from '@/router/paths'
import CustomIcon from '@/components/CustomIcon.vue'
import { useCommonStore } from '@/store/useCommonStore'
import { LOCALSTORAGE_KEYS } from '@/static/enums'
import { useAccessesStore } from '@/store/useAccesses'

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

const SELECT_ROLE = {
  name: 'Select Role',
  icon: 'select-role',
}

const LOG_OFF_ITEM = {
  name: 'Logout',
  icon: 'logout',
}

const store = useCommonStore()
const currentName = computed(
  () => `${store.userInfo.lastName ?? ''}, ${store.userInfo.firstName ?? ''}`
)

const currentRole = computed(() => {
  // const role = store.userInfo.roles.find((item) => item.roleCode === store.role)
  // return role?.roleName ?? ''
})

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
    case SELECT_ROLE.name:
      visible.value = true
      break
    default:
      window.location.href = `http://localhost:${import.meta.env.VITE_PORT}/#${
        paths.redirect4develop
      }?${qs.stringify({
        org: store.org,
        role: store.role,
        token: localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN),
        system: store.system,
      })}`
  }
}
</script>

<style lang="scss" scoped>
.current-role {
  @apply mr-[8px] mt-0.5 text-[14px] font-semibold text-white;
}

.user-box {
  margin-right: -4px;
  @apply p-1;
  @apply rounded;
  @apply cursor-pointer;
  @apply hover:bg-[#22373f];
}
</style>
<style lang="scss">
.system-btn-dropdown {
  background-color: #303133 !important;
  border-color: #444444 !important;

  .el-dropdown-menu {
    @apply bg-[#303133];

    .el-dropdown-menu__item {
      @apply text-[12px] leading-[28px] text-white;

      &:not(.is-disabled):focus {
        @apply bg-[#303133] text-white;
      }
    }
  }

  .el-popper__arrow {
    &:before {
      border-color: #444444 !important;
      background-color: #303133 !important;
    }
  }
}
</style>
