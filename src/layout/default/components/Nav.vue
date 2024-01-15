<template>
  <el-scrollbar class="scrollbar-container" @scroll="onScroll">
    <el-menu :collapse-transition="false" :default-openeds="opened" class="el-menu-vertical">
      <template v-for="(item, index) in menus" :key="item.path">
        <el-sub-menu :index="index">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">{{ item.name }}</el-menu-item>
            <el-menu-item index="1-2">{{ item.name }}</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">{{ item.name }}</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>{{ item.name }}</template>
            <el-menu-item index="1-4-1">{{ item.name }}</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>
<script lang="ts" setup>
// import * as R from 'ramda'

// import NavIcon from '@/layout/default/components/NavIcon.vue'
// import { routerTo } from '@/utils/router'
// import { useCommonStore } from '@/store/useCommonStore'
// import { useAccessesStore } from '@/store/useAccesses'

// import type { Menu } from '../../typing/common.d'

// const route = useRoute()
// const store = useCommonStore()
// const accesses = useAccessesStore()

const menus = ref([{ name: 'aaaa' }])

const collapse = ref()

let stopScrolling: () => void
const onScroll = ({ scrollTop }: { scrollTop: number }) => {
  if (scrollTop !== 0) stopScrolling = collapse.value.scrolling()
  else stopScrolling?.()
}

// const isCollapse = computed(() => store.isCollapse)
/**
 * permission?: string 权限，具体需要访问的值需要从 store/accesses.ts 中获取
 * v-permission 为自定义指令
 */
// const menus = computed<Menu[]>(() =>
//   [
//     {
//       name: 'Dashboard',
//       path: '/welcome',
//       permission: 'canAccessDashboard',
//       customIconName: 'dashboard',
//     },
//   ]
//     .map((item: Menu) => ({
//       ...item,
//       children: item.children?.filter((item) => !item.permission || accesses[item.permission]),
//     }))
//     .filter((item) => !item.permission || accesses[item.permission])
// )

// 跳转页面
// const pageHopping = ({ path, type }: Menu) => {
//   if (!path) return
//   routerTo({ path }, { type })
// }

const opened = ref<string[]>([])

// 二级菜单高亮显示
// const activeIndex = computed(() =>
//   R.pipe(
//     R.concat(R.pluck('children', menus.value)),
//     R.flatten,
//     R.filter<Menu>(
//       (item) => item && R.startsWith((item.activePath ?? item.path) as string, route.path)
//     ),
//     R.tap((x) => {
//       opened.value = (x as unknown as Menu[]).reverse().map((r) => r.path)
//       return x
//     }),
//     R.sort((a: Menu, b: Menu) => a.path.localeCompare(b.path)),
//     R.last,
//     R.defaultTo({} as any),
//     R.prop('path'),
//     R.defaultTo(undefined)
//   )(menus.value)
// )
</script>

<style lang="scss" scoped>
.el-menu-vertical {
  @apply border-0 bg-transparent;

  &:not(.el-menu--collapse) {
    width: 225px;
    height: calc(100vh - 120px);
  }

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    @apply flex items-center justify-start;
    @apply h-[54px];
    @apply px-[16px] #{!important};

    .nav-parent-title,
    .nav-child-title {
      @apply text-[15px] font-medium text-unchecked-gray;
    }

    .icon-box {
      @apply text-unchecked-gray;
    }

    &:not(.is-active):hover {
      @apply bg-[#22373f];
    }

    &.is-active {
      @apply bg-dark-blue bg-opacity-60 text-white;

      .icon-box {
        @apply text-white;
      }

      .nav-parent-title,
      .nav-child-title {
        @apply font-semibold text-white;
      }
    }
  }
  :deep(.el-sub-menu) {
    .el-menu {
      @apply bg-transparent;
    }

    .el-sub-menu__icon-arrow {
      @apply text-white;
    }

    &.is-active {
      @apply bg-dark-blue bg-opacity-60 text-white;

      .icon-box {
        @apply text-white;
      }

      .el-menu-item,
      .el-sub-menu__title {
        @apply bg-transparent;

        .nav-parent-title,
        .nav-child-title {
          @apply font-semibold text-white;
        }

        &.is-active {
          .nav-parent-title,
          .nav-child-title {
            @apply text-active-blue;
          }
        }
      }
    }
  }

  &.el-menu--collapse {
    width: 56px;

    :deep(.collapse-box),
    :deep(.el-menu-item) {
      width: 100%;
      .nav-parent-title,
      .nav-child-title {
        opacity: 0;
      }

      &.is-button {
        .icon-box {
          margin-left: -1px;
          visibility: visible;
          @apply cursor-pointer;

          .el-icon {
            @apply text-white;
            font-size: 20px;
          }

          &:hover {
            @apply text-[#00ADEF];
            background: rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
    :deep(.icon-box) {
      margin-right: 0;
    }
    :deep(.el-sub-menu) {
      .el-sub-menu__title {
        @apply justify-center;
      }
    }
  }
}

.scrollbar-container {
  height: calc(100% - 44px);

  :deep(.el-scrollbar__wrap) {
    max-height: calc(100vh - 104px);
  }
}
</style>

<style lang="scss">
.submenu-popup-container {
  .el-menu-item {
    @apply h-10;
  }
  .icon-box:empty {
    @apply mr-0 w-0;
  }
}
</style>
