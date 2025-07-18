import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import printTree from "../mesh/tree.js";
import printTangerine from "../mesh/tangerine.js";

const $result = document.getElementById('result')

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287)
// scene.add(요소);

// 2. Camera: Scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(50, $result.clientWidth / $result.clientHeight, 0.1, 1000);
camera.position.set(3, 3, 3);
// camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0)

// 3. Renderer: Scene+Camera, 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer({ canvas: $result, antialias: true });
renderer.setSize($result.clientWidth, $result.clientHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// 도형
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshStandardMaterial({ color: 0x2E6FF2 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.castShadow = true;

const geometry2 = new THREE.PlaneGeometry(10, 10);
const material2 = new THREE.MeshStandardMaterial({ color: 0x81a8f7, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = Math.PI / -2;
plane.position.y = -1;
scene.add(plane);
plane.receiveShadow = true;

// 그림자: 빛 - DirectionalLight, PointLight, SpotLight
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0, 2, 2);
scene.add(dl);
dl.castShadow = true;

// 그림자 해상도
dl.shadow.mapSize.width = 1024;
dl.shadow.mapSize.height = 1024;

// 그림자 블러
dl.shadow.radius = 5;

// 나무
// const tree1 = printTree();
// scene.add(tree1);
// // 한라봉
// const tangerine1 = printTangerine();
// tangerine1.position.x = 3;
// tangerine1.scale.set(0.8, 0.8, 0.8);
// scene.add(tangerine1);

const axes = new THREE.AxesHelper(10);
scene.add(axes);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 조작 설정
// controls.enableZoom = false;
// controls.enableRotate = false;
// controls.enablePan = false;

// controls.minDistance = 2
// controls.maxDistance = 10;
// controls.maxPolarAngle = Math.PI / 3;

// controls.autoRotate = true;
// controls.autoRotateSpeed = -10;

// controls.enableDamping = true;

function animate() {
  // box.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update()
}
animate();

window.addEventListener('resize', () => {
  // 1. 카메라의 종횡비
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();  // 카메라 업데이트

  // 2. 렌더러의 크기
  renderer.setSize(window.innerWidth, window.innerHeight)
})