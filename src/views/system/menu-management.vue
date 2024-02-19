<template>
  <div class="menuManagement p-5">
    <el-button type="primary" size="small" @click="addOrEditMenu('add')">添加菜单</el-button>
    <el-table v-loading="loading" :data="menuData" class="mt-3" default-expand-all row-key="path">
      <el-table-column prop="name" label="菜单名称" />
      <el-table-column prop="mark" label="备注" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          {{ row.status ? '激活' : '禁用' }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="openAuth()">分配角色</el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="onAddChild(row)"
            v-if="row.type === 'root'"
            >添加菜单</el-button>
          <el-button link type="primary" size="small" @click="addOrEditMenu('edit', row)">编辑</el-button>
          <el-button link type="primary" size="small" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogVisible" :title="title" width="30%">
    <el-form :model="form" ref="formRef">
      <el-form-item label="菜单名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.mark" autocomplete="off" />
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="状态">
          <el-option label="禁用" value="false" />
          <el-option label="激活" value="true" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="changeMenu()"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="userVisible" title="分配权限" width="40%">
    <el-transfer v-model="userValue" :data="roleData" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="closeDialog"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import commonAPIS from '@/api/common'

const menuData = ref([])
const roleData = ref()
const userValue = ref([])
const userVisible = ref(false)
const dialogVisible = ref(false)
const title = ref()
const currentData = ref()
const form = reactive({
  name: '',
  mark: '',
  status: '',
})
const loading = ref(true)

const formLabelWidth = '80px'
async function getList() {
  try {
    const { code, data } = await commonAPIS.getMenuList()
    if (code === 200) {
      menuData.value = data
      loading.value = false
    }
  } catch (err) {
    console.log('Error', err)
  }
}

const addOrEditMenu = (type: any, item?: any) => {
  if (type === 'add') {
    title.value = '添加菜单'
  } else {
    title.value = '编辑菜单'
    currentData.value = item
    item.status = item.status ? '激活' : '禁用'
    Object.assign(form, item)
  }
  dialogVisible.value = true
}

const onAddChild = (item: any) => {
  item.children.push({
    name: '',
    mark: '',
    status: '',
  })
}

const del = (item: any) => {
  ElMessageBox.confirm('你确定要删除该条数据吗？')
    .then(async () => {
      const { code } = await commonAPIS.delUser({ id: item.id })
      if (code === 200) {
        if (item.type === 'root') {
          menuData.value = menuData.value.filter((v: any) => v.path !== item.path)
        } else {
          menuData.value.forEach((el: any) => {
            if (el.path === item.root) {
              el.children = el.children.filter((c: any) => c.path !== item.path)
            }
          })
        }
        ElMessage.success('删除成功！')
      }
    })
    .catch(() => {
      // catch error
    })
}

const openAuth = () => {
  userVisible.value = true
  getRoleList()
}

async function getRoleList() {
  try {
    const { code, data } = await commonAPIS.getRoleList()
    if (code === 200) {
      const temp = []
      for (let i = 0; i < data.items.length; i++) {
        temp.push({
          key: i,
          label: data.items[i].roleName,
        })
      }
      roleData.value = temp
    }
  } catch (err) {
    console.log('Error', err)
  }
}

const changeMenu = async () => {
  if (title.value === '添加菜单') {
    // await add(form.value)
  } else {
    // await edit(currentData.value)
  }
  closeDialog()
}

const closeDialog = () => {
  dialogVisible.value = false
  userVisible.value = false
}
onMounted(() => {
  getList()
})
</script>
<style lang="scss" scoped></style>
