<template>
  <div>
    <div id="webgl" style="margin-top: 200px; margin-left: 100px"></div>
    DDDDD
  </div>
</template>
<script lang="ts" setup>
// eslint-disable-next-line import/no-extraneous-dependencies
import * as THREE from 'three'

const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(100, 100, 100)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000, // 0xff0000设置材质颜色为红色
})
const mesh = new THREE.Mesh(geometry, material) // 网格模型对象Mesh
// 设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh.position.set(0, 10, 0)
scene.add(mesh)
const width = 800 // 宽度
const height = 500 // 高度
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
camera.position.set(200, 200, 200)
camera.lookAt(mesh.position)
// 网格模型位置xyz坐标：0,10,0
mesh.position.set(0, 10, 0)
// 相机位置xyz坐标：200, 200, 200
camera.position.set(200, 200, 200)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height) // 设置three.js渲染区域的尺寸(像素px)
renderer.render(scene, camera) // 执行渲染操作
setTimeout(() => {
  document.getElementById('webgl').appendChild(renderer.domElement)
}, 1000)
</script>
<style lang="scss" scoped></style>
