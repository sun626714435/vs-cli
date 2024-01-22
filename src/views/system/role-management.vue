<template>
  <div class="roleManagement p-5">
    <el-button type="primary" size="small" @click="addOrEditRole('add')">添加角色</el-button>
    <el-table :data="roleData" class="mt-3">
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="mark" label="备注" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          {{ row.status ? '激活' : '禁用' }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="openUser(row)">分配用户</el-button>
          <el-button link type="primary" size="small" @click="addOrEditRole('edit', row)">编辑</el-button>
          <el-button link type="primary" size="small" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogVisible" :title="title" width="30%">
    <el-form :model="form" ref="formRef">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.roleName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.mark" autocomplete="off" />
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
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="changeRole"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="userVisible" title="分配用户" width="40%">
    <el-transfer v-model="userValue" :data="userData" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="changeRole"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import commonAPIS from '@/api/common'

const roleData = ref([])
const dialogVisible = ref(false)
const userVisible = ref(false)
let title = ref('')
const currentData = ref()
const form = reactive({
  roleName: '',
  mark: '',
  status: '',
})
const formLabelWidth = '80px'

const userData = ref<Option[]>()
const userValue = ref([])

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

const addOrEditRole = (type: any, item: any) => {
  if (type === 'add') {
    title = '添加角色'
  } else {
    title = '编辑角色'
    currentData.value = item
    item.status = item.status ? '激活' : '禁用'
    Object.assign(form, item)
  }
  dialogVisible.value = true
}

const changeRole = async () => {
  if (title === '添加角色') {
    await add(form.value)
  } else {
    await edit(currentData.value)
  }
  closeDialog()
}
const add = async () => {
  try {
    const { code } = await commonAPIS.addUser(form.value)
    if (code === 200) {
      const obj = {
        id: roleData.value.length + 1,
        roleName: form.roleName,
        mark: form.mark,
        status: form.status,
      }
      roleData.value.push(obj)
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
const closeDialog = () => {
  dialogVisible.value = false
  userVisible.value = false
}

const del = (item: any) => {
  ElMessageBox.confirm('你确定要删除该条数据吗？')
    .then(async () => {
      const { code } = await commonAPIS.delUser({ id: item.id })
      if (code === 200) {
        roleData.value = roleData.value.filter((v) => v.id !== item.id)
        ElMessage.success('删除成功！')
      }
    })
    .catch(() => {
      // catch error
    })
}

const openUser = () => {
  userVisible.value = true
  getUserList()
}
async function getUserList() {
  try {
    const { code, data } = await commonAPIS.getUserList()
    if (code === 200) {
      const temp: Option[] = []
      for (let i = 0; i < data.items.length; i++) {
        temp.push({
          key: i,
          label: data.items[i].name,
        })
      }
      userData.value = temp
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
