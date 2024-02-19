<template>
  <div class="userManagement p-5">
    <el-form :inline="true" :model="formInline" class="search-form">
      <el-form-item label="">
        <el-input
          v-model="formInline.user"
          :placeholder="$t('userManagement.userName')"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">{{ $t('userManagement.search') }}</el-button>
        <el-button type="primary" @click="addoreditUser('add')">{{
          $t('userManagement.add')
        }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userData" class="mt-3">
      <el-table-column prop="name" :label="$t('userManagement.name')" />
      <el-table-column prop="sex" :label="$t('userManagement.sex')">
        <template #default="{ row }">
          {{ row.sex === 0 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column prop="email" :label="$t('userManagement.email')" />
      <el-table-column prop="role" :label="$t('userManagement.role')" />
      <el-table-column prop="status" :label="$t('userManagement.isAvailable')">
        <template #default="{ row }">
          <el-switch v-model="row.status" @change="edit(row)" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('userManagement.operation')" width="120">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="addoreditUser('edit', row)">{{
            $t('userManagement.edit')
          }}</el-button>
          <el-button link type="primary" size="small" @click="del(row)">{{
            $t('userManagement.del')
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination background layout="prev, pager, next" :total="1000" /> -->
  </div>
  <el-dialog v-model="dialogFormVisible" :title="title" width="30%">
    <el-form :model="form" ref="formRef">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="form.sex" placeholder="请选择">
          <el-option label="男" value="0" />
          <el-option label="女" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth">
        <el-input v-model="form.role" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户状态" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="状态">
          <el-option label="禁用" value="false" />
          <el-option label="激活" value="true" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog(formRef)">取消</el-button>
        <el-button type="primary" @click="changeUser(formRef)"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import commonAPIS from '@/api/common'

const formInline = reactive({
  user: '',
})
const dialogFormVisible = ref(false)
const formLabelWidth = '80px'
const formRef = ref<FormInstance>()
const form = reactive({
  name: '',
  sex: '',
  email: '',
  role: '',
  status: '',
})
const title = ref('添加用户')
const userData = ref()
const currentData = ref()
const search = () => {
  if (formInline.user === '') {
    getUserList()
  } else {
    userData.value = userData.value.filter((v: any) => v.name.includes(formInline.user))
  }
}
const addoreditUser = (type: any, item?: any) => {
  if (type === 'add') {
    title.value = '添加用户'
  } else {
    title.value = '编辑用户'
    currentData.value = item
    item.sex = item.sex === 0 ? '男' : '女'
    item.status = item.status ? '激活' : '禁用'
    Object.assign(form, item)
  }
  dialogFormVisible.value = true
}

const changeUser = async (formEl: FormInstance | undefined) => {
  if (title.value === '添加用户') {
    await add()
  } else {
    await edit(currentData.value)
  }
  closeDialog(formEl)
}

const add = async () => {
  try {
    const { code } = await commonAPIS.addUser(form)
    if (code === 200) {
      const obj = {
        id: userData.value.length + 1,
        name: form.name,
        sex: form.sex,
        email: form.email,
        role: form.role,
        status: form.status,
      }
      userData.value.push(obj)
      ElMessage.success('添加成功！')
    }
  } catch (err) {
    console.log('Error', err)
  }
}

const edit = async (item: any) => {
  try {
    const { code } = await commonAPIS.editUser(item.id)
    if (code === 200) {
      ElMessage.success('修改成功！')
    }
  } catch (err) {
    console.log('Error', err)
  }
}

const closeDialog = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  dialogFormVisible.value = false
}

const del = (item: any) => {
  ElMessageBox.confirm('你确定要删除该条数据吗？')
    .then(async () => {
      const { code } = await commonAPIS.delUser({ id: item.id })
      if (code === 200) {
        userData.value = userData.value.filter((v: any) => v.id !== item.id)
        ElMessage.success('删除成功！')
      }
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
