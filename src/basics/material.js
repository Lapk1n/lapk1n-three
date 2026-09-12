import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene();

// Textures & Materials
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
// const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
// const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')

// const basicMaterial = new THREE.MeshBasicMaterial({ map: matcapTexture })
// const basicMaterial = new THREE.MeshNormalMaterial({ flatShading: true })
// const basicMaterial = new THREE.MeshMatcapMaterial({ map: matcapTexture })
// const basicMaterial = new THREE.MeshDepthMaterial()

// best two for lights
// const basicMaterial = new THREE.MeshLambertMaterial()
// const basicMaterial = new THREE.MeshPhongMaterial()

// const basicMaterial = new THREE.MeshStandardMaterial()
// basicMaterial.map = doorColorTexture
// basicMaterial.aoMap = doorAmbientOcclusionTexture
// basicMaterial.displacementMap = doorHeightTexture
// basicMaterial.metalnessMap = doorMetalnessTexture
// basicMaterial.roughnessMap = doorRoughnessTexture
// basicMaterial.normalMap = doorNormalTexture
// basicMaterial.alphaMap = doorAlphaTexture
// basicMaterial.transparent = true
// basicMaterial.aoMapIntensity = 1
// basicMaterial.displacementScale = 0.05

// basicMaterial.shininess = 100
// basicMaterial.metalness = 0.7
// basicMaterial.roughness = 0.6

const basicMaterial = new THREE.MeshStandardMaterial()
basicMaterial.metalness = 1
basicMaterial.roughness = 0
basicMaterial.envMap = environmentMapTexture

// Objects

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 32), basicMaterial)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5, 100, 100), basicMaterial)
plane.position.x = -0.75

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 16, 32), basicMaterial)
torus.position.x = 0.75

scene.add(sphere, plane, torus)

// Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)
// const pointLight = new THREE.PointLight(0xffffff, 0.5)
// pointLight.position.set(2, 3, 4)
// scene.add(pointLight)

// Params 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const clock = new THREE.Clock()

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 0, 1.5)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
 
// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)


// Animation
const animation = () => {

    // sphere.rotation.y = 0.1 * clock.getElapsedTime()
    // plane.rotation.y = 0.1 * clock.getElapsedTime()
    // torus.rotation.y = 0.1 * clock.getElapsedTime()
    // sphere.rotation.x = 0.15 * clock.getElapsedTime()
    // plane.rotation.x = 0.15 * clock.getElapsedTime()
    // torus.rotation.x = 0.15 * clock.getElapsedTime()

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(animation)
}

animation()

/* Notes
    - some materials does not react to lights, depthMaterial is one of them
    - using gui is very useful to test a material props
    - one of the tricks is to apply several textures to one object
      some of them imporve the contrast another ones the shape
    - MeshStandardMaterial is the best and universal solution
    - to work with opacity things we have to set material.transparent = true
*/


