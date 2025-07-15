import * as THREE from "three";
import WebGL from '../../node_modules/three/examples/jsm/capabilities/WebGL.js'

const $result = document.getElementById('result')

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287)
// scene.add(요소);

// 2. Camera: Scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(50, $result.clientWidth / $result.clientHeight, 0.1, 1000);
camera.position.set(5, 5, 5);
// camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0)

// 3. Renderer: Scene+Camera, 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer({ canvas: $result, antialias: true });
renderer.setSize($result.clientWidth, $result.clientHeight);
// console.log(renderer)
// document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff)
light.position.set(2, 4, 3)
scene.add(light)

const geometry = new THREE.DodecahedronGeometry(1);
const material = new THREE.MeshStandardMaterial({
  color: 0xffaaaa,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// axesHelper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper)

// 1. 위치
// Mesh.position.x = 2;
// mesh.position.y = 1;
mesh.position.set(0, 2, 1);

// 2. 회전
mesh.rotation.y = THREE.MathUtils.degToRad(30);

// 3. 크기
mesh.scale.x = 1.2
mesh.scale.z = 0.8

function animate() {
  // box.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  // 1. 카메라의 종횡비
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();  // 카메라 업데이트

  // 2. 렌더러의 크기
  renderer.setSize(window.innerWidth, window.innerHeight)
})