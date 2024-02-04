<template>
  <div>
    <h4>将数据存储在indexDB</h4>
    <el-button type="primary" @click="addDBData">添加数据</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
      <el-table-column fixed="right" label="operation" width="120">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="updateDBData(row)">change</el-button>
          <el-button link type="primary" size="small" @click="delDBData(row)">{{
            $t('userManagement.del')
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
const tableData = ref()

const DATA_BASE = 'tableDemoData'
let db: any
const request = window.indexedDB.open(DATA_BASE, 1)
request.onerror = function (e) {
  console.error('error', e)
}
request.onsuccess = function (event) {
  db = (event.target as any).result
}

request.onupgradeneeded = function (event) {
  db = (event.target as any).result

  const objectStore = db.createObjectStore('users', { keyPath: 'id' })
  objectStore.createIndex('date', 'date', { unique: false })
  objectStore.createIndex('name', 'name', { unique: false })
  objectStore.createIndex('address', 'address', { unique: false })

  objectStore.transaction.oncomplete = function () {
    const transaction = db.transaction(['users'], 'readwrite')
    const objStore = transaction.objectStore('users')
    const temp = [
      {
        id: 1,
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 2,
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 3,
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 4,
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]
    temp.forEach((customer) => {
      objStore.add(customer)
    })
  }
}

function addDBData() {
  const transaction = db.transaction(['users'], 'readwrite')
  const objectStore = transaction.objectStore('users')
  const request = objectStore.add({
    id: Math.random() * 10,
    date: new Date(),
    name: `TOM-${Math.random()}`,
    address: 'No. 189, Grove St, Los Angeles',
  })

  transaction.oncomplete = function () {
    getDBData()
  }

  transaction.onerror = function (error: any) {
    console.error('add error', error)
  }

  request.onsuccess = function () {
    console.log('add complete')
  }
}

function getDBData() {
  const transaction = db.transaction(['users'], 'readwrite')
  const objectStore = transaction.objectStore('users')
  const request = objectStore.getAll()
  request.onsuccess = function (event: any) {
    tableData.value = [...event.target.result]
  }

  request.onerror = function (err: any) {
    console.error('get error', err)
  }
}
function delDBData(row: any) {
  const request = db.transaction(['users'], 'readwrite').objectStore('users').delete(row.id)

  request.onsuccess = function () {
    getDBData()
  }
}
function updateDBData(row: any) {
  const transaction = db.transaction(['users'], 'readwrite')
  const objectStore = transaction.objectStore('users')
  const request = objectStore.get(row.id)

  request.onsuccess = function (event: any) {
    const d = event.target.result
    d.name = 'name name'
    const objectStoreUpdate = objectStore.put(d)
    objectStoreUpdate.onsuccess = function () {
      getDBData()
    }
  }

  request.onerror = function (err: any) {
    console.error('get error', err)
  }
}
onMounted(() => {
  setTimeout(() => {
    getDBData()
  }, 1000)
})
</script>

<style lang="scss" scoped></style>
