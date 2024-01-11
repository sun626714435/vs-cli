<template>
  <el-scrollbar class="scrollbar-container" @scroll="onScroll">
    <el-menu
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="activeIndex"
      :default-openeds="opened"
      class="el-menu-vertical"
    >
   
      <template v-for="item in menus" :key="item.path">
        <el-sub-menu
          popper-class="submenu-popup-container"
          v-if="item.children"
          v-permission="item.permission"
          :index="item.path"
        >
          <!-- 一层title -->
          <template #title>
            <NavIcon :data="item" />
            <span class="nav-parent-title">{{ item.name }}</span>
          </template>
          <!-- 一层内容 -->
          <template v-if="item.children">
            <template v-for="subItem in item.children" :key="subItem.path">
              <el-menu-item
                v-if="!subItem.children"
                v-permission="subItem.permission"
                :index="subItem.path"
                @click="pageHopping(subItem)"
              >
                <NavIcon :data="subItem" />
                <span class="nav-child-title">{{ subItem.name }}</span>
              </el-menu-item>
              <el-sub-menu
                v-else
                v-permission="subItem.permission"
                :index="subItem.path"
                popper-class="submenu-popup-container"
              >
                <template #title>
                  <NavIcon :data="subItem" />
                  <span class="nav-child-title">{{ subItem.name }}</span>
                </template>
                <template v-for="subItemChild in subItem.children" :key="subItemChild.name">
                  <el-menu-item
                    v-permission="subItemChild.permission"
                    :index="subItemChild.path"
                    @click="pageHopping(subItemChild)"
                  >
                    <template #title>
                      <NavIcon :data="subItemChild" />
                      <span>{{ subItemChild.name }}</span>
                    </template>
                  </el-menu-item>
                </template>
              </el-sub-menu>
            </template>
          </template>
        </el-sub-menu>
        <el-menu-item
          v-else
          v-permission="item.permission"
          :class="{ 'is-button': item.highlightable === false }"
          :index="item.path"
          @click="pageHopping(item)"
        >
          <template v-if="isCollapse">
            <NavIcon :data="item" />
          </template>
          <template v-else>
            <NavIcon :data="item" />
            <span class="nav-parent-title">{{ item.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import * as R from 'ramda'

import NavIcon from '@/layout/default/components/NavIcon.vue'
import { routerTo } from '@/utils/router'
import { useCommonStore } from '@/store/useCommonStore'
import { useAccessesStore } from '@/store/useAccesses'

import type { Menu } from '../../types/common.d'

const route = useRoute()
const store = useCommonStore()
const accesses = useAccessesStore()

const collapse = ref()

let stopScrolling: () => void
const onScroll = ({ scrollTop }: { scrollTop: number }) => {
  if (scrollTop !== 0) stopScrolling = collapse.value.scrolling()
  else stopScrolling?.()
}

const isCollapse = computed(() => store.isCollapse)
/**
 * permission?: string 权限，具体需要访问的值需要从 store/accesses.ts 中获取
 * v-permission 为自定义指令
 */
const menus = computed<Menu[]>(() =>
  []
    .map((item: Menu) => ({
      ...item,
      children: item.children?.filter((item) => !item.permission || accesses[item.permission]),
    }))
    .filter((item) => !item.permission || accesses[item.permission])
)

// 跳转页面
const pageHopping = ({ path, type }: Menu) => {
  if (!path) return
  routerTo({ path }, { type })
}

const opened = ref<string[]>([])

// 二级菜单高亮显示
const activeIndex = computed(() =>
  R.pipe(
    R.concat(R.pluck('children', menus.value)),
    R.flatten,
    R.filter<Menu>(
      (item) => item && R.startsWith((item.activePath ?? item.path) as string, route.path)
    ),
    R.tap((x) => {
      opened.value = (x as unknown as Menu[]).reverse().map((r) => r.path)
      return x
    }),
    R.sort((a: Menu, b: Menu) => a.path.localeCompare(b.path)),
    R.last,
    R.defaultTo({} as any),
    R.prop('path'),
    R.defaultTo(undefined)
  )(menus.value)
)
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
      //padding: 0 16px !important;

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
