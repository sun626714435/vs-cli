<template>
  <div class="menuManagement p-5">
    <el-button type="primary" size="small" @click="addOrEditUser('add')">添加菜单</el-button>
    <el-table :data="menuData" class="mt-3" default-expand-all row-key="id">
      <el-table-column prop="name" label="菜单名称" />
      <el-table-column prop="mark" label="备注" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          {{ row.status ? '激活' : '禁用' }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="openUser(row)">分配权限</el-button>
          <el-button link type="primary" size="small" @click="addOrEditMenu('edit', row)">编辑</el-button>
          <el-button link type="primary" size="small" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import commonAPIS from '@/api/common'

const menuData = ref([])
async function getList() {
  try {
    const { code, data } = await commonAPIS.getMenuList()
    if (code === 200) {
      menuData.value = data
    }
  } catch (err) {
    console.log('Error', err)
  }
}
onMounted(() => {
  getList()
})
</script>
<style lang="scss" scoped></style>
