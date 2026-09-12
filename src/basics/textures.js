import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene();

// Params 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Textures
const loadManager = new THREE.LoadingManager()
loadManager.onStart = () => console.log('start')
loadManager.onProgress = () => console.log('in progress')
loadManager.onLoad = () => console.log('loaded')

const loader = new THREE.TextureLoader(loadManager)
// const colorTexture = loader.load('/textures/minecraft.png')
// const alphaTexture = loader.load('/textures/door/alpha.jpg')
// const heightTexture = loader.load('/textures/door/height.jpg')
const normalTexture = loader.load('/textures/door/normal.jpg')

normalTexture.magFilter = THREE.NearestFilter
// perfomance hint
normalTexture.generateMipmaps = false

const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1), 
    new THREE.MeshBasicMaterial({ map: normalTexture })
)
scene.add(mesh1)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 0, 2)
 
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

// Animation
const animation = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(animation)
}

animation()

/* Notes
 Its enough to create one loader instance and use it for
 for all textures to be loaded. But there could be a lot
 of textures/fonts/models. To define if they loaded or not
 its recomended to use LoadManager

 If we use mipmaping for increasing the texture quality
 we should keep in mind, that the texture resolution numbers
 must be divided by 2 until its one - 512/2 = 256, 256/2...../2 = 1
 So its about 128, 256, 512, 1024, 2048, 4096 numbers

 Some resourses of getting textures:
  - poligon.com
  - 3dextures.me
  - arroway-textures.ch
*/


