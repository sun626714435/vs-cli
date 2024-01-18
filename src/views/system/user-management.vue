<template>
  <div class="userManagement p-5">
    <el-form :inline="true" :model="formInline" class="search-form">
      <el-form-item label="">
        <el-input v-model="formInline.user" placeholder="用户名" clearable />
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="formInline.region" placeholder="用户状态" clearable>
          <el-option label="禁用" value="disable" />
          <el-option label="激活" value="activate" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="addoreditUser('add')">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userData" class="mt-3">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="role" label="角色" />
      <el-table-column prop="status" label="是否禁用">
        <template #default="{ row }">
          <el-switch v-model="row.status" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="addoreditUser('edit', row)">编辑</el-button>
          <el-button link type="primary" size="small" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>
  <el-dialog v-model="dialogFormVisible" :title="title">
    <el-form :model="form">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-input v-model="form.sex" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth">
        <el-input v-model="form.role" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户状态" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="Please select a zone">
          <el-option label="禁用" value="false" />
          <el-option label="激活" value="true" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessageBox } from 'element-plus'
import commonAPIS from '@/api/common'

const formInline = reactive({
  user: '',
  status: true,
})
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  sex: '',
  email: '',
  role: '',
  status: '',
})
let title = ref('添加用户')
const userData = ref([])
const currentData = ref()
const onSubmit = () => {
  console.log('submit!')
}
const addoreditUser = (type: any, item: any) => {
  if (type === 'add') {
    title = '添加用户'
  } else {
    title = '编辑用户'
    currentData.value = item
  }
  dialogFormVisible.value = true
}

const del = (item: any) => {
  ElMessageBox.confirm('你确定要删除该条数据吗？')
    .then(() => {
      userData.value = userData.value.filter((v) => v.id !== item.id)
    })
    .catch(() => {
      // catch error
    })
}

async function getUserList() {
  try {
    const { code, data } = await commonAPIS.getUserList()
    if (code === 200) {
      userData.value = data.items
    }
  } catch (err) {
    console.log('Error', err)
  }
}

onMounted(() => {
  getUserList()
})
</script>
<style lang="scss" scoped>
.search-form .el-input {
  --el-input-width: 220px;
}

.search-form .el-select {
  --el-select-width: 220px;
}
</style>
