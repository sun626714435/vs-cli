<template>
  <div>
    <div id="webgl" style="margin-top: 200px; margin-left: 100px"></div>
    DDDDD
  </div>
</template>
<script lang="ts" setup>
// eslint-disable-next-line import/no-extraneous-dependencies
import * as THREE from 'three'

// const scene = new THREE.Scene()
// const geometry = new THREE.BoxGeometry(100, 100, 100)
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000, // 0xff0000设置材质颜色为红色
// })
// const mesh = new THREE.Mesh(geometry, material) // 网格模型对象Mesh
// // 设置网格模型在三维空间中的位置坐标，默认是坐标原点
// mesh.position.set(0, 10, 0)
// scene.add(mesh)
// const width = 500 // 宽度
// const height = 300 // 高度
// // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
// const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
// camera.position.set(200, 200, 200)
// camera.lookAt(mesh.position)
// // 网格模型位置xyz坐标：0,10,0
// mesh.position.set(0, 10, 0)
// // 相机位置xyz坐标：200, 200, 200
// camera.position.set(200, 200, 200)

const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(100, 100, 100)
const material = new THREE.MeshBasicMaterial({
  color: 0x0000ff, // 设置材质颜色
  transparent: true, // 开启透明
  opacity: 0.5, // 设置透明度
})
const mesh = new THREE.Mesh(geometry, material) // 网格模型对象Mesh
scene.add(mesh)
const width = 300 // 宽度
const height = 300 // 高度
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 300)
const axesHelper = new THREE.AxesHelper(150)
scene.add(axesHelper)
const pointLight = new THREE.PointLight(0xffffff, 1.0)
// pointLight.position.set(400, 0, 0);//点光源放在x轴上
pointLight.position.set(400, 200, 300)
scene.add(pointLight) // 点光源添加到场景中
mesh.position.set(10, 0, 0)
camera.position.set(-100, 0, 0)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height) // 设置three.js渲染区域的尺寸(像素px)
renderer.render(scene, camera) // 执行渲染操作
// setTimeout(() => {
//   document.getElementById('webgl').appendChild(renderer.domElement)
// }, 1000)
</script>
<style lang="scss" scoped></style>
