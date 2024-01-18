<template>
  <div class="roleManagement p-5">
    <el-button type="primary" size="small" @click="handleClick">添加角色</el-button>
    <el-table :data="roleData" class="mt-3">
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="mark" label="备注" />
      <el-table-column prop="status" label="状态" />
      <el-table-column fixed="right" label="操作">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">分配用户</el-button>
          <el-button link type="primary" size="small" @click="handleClick">分配权限</el-button>
          <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
          <el-button link type="primary" size="small" @click="handleClick">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import commonAPIS from '@/api/common'

const roleData = ref([])
const handleClick = () => {
  console.log('click')
}

async function getRoleList() {
  try {
    const { code, data } = await commonAPIS.getRoleList()
    if (code === 200) {
      roleData.value = data.items
    }
  } catch (err) {
    console.log('Error', err)
  }
}

onMounted(() => {
  getRoleList()
})
</script>
<style lang="scss" scoped></style>
