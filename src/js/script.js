import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as dat from "dat.gui"

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
)

const orbit = new OrbitControls(camera,renderer.domElement)

const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

camera.position.set(-10,-10,30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry(4,4,4)
const boxMaterial = new THREE.MeshStandardMaterial({color:'#f00'})
const box = new THREE.Mesh(boxGeometry,boxMaterial);
// scene.add(box)

const planeGeometry = new THREE.PlaneGeometry(20,20);
const planeMaterial = new THREE.MeshStandardMaterial(
    {
        color:'#fff',
        side:THREE.DoubleSide
    })
const plane = new THREE.Mesh(planeGeometry,planeMaterial)
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI
plane.receiveShadow = true

const sphereGeomerty = new THREE.SphereGeometry(1,25,25);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color:'#00f'})
const sphere = new THREE.Mesh(sphereGeomerty, sphereMaterial)
scene.add(sphere)

sphere.position.x = -6
sphere.position.y = 3

const ambientLight = new THREE.AmbientLight(0x333333);
// scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#fff',1);
directionalLight.castShadow = true
directionalLight.shadow.camera.bottom = -12
// scene.add(directionalLight)

const spotLight = new THREE.SpotLight();
spotLight.position.set( -50, 30, 0 );
spotLight.angle = .2
spotLight.intensity = 2000;
spotLight.distance = 100;
spotLight.castShadow = true;
scene.add(spotLight)

sphere.castShadow = true
directionalLight.position.set(-30,50,0)

// const dLHelper = new THREE.DirectionalLightHelper(directionalLight,5);
// scene.add(dLHelper)

scene.fog = new THREE.FogExp2('#000',
.01)

const gui = new dat.GUI()

const options = {
    sphereColor:'#ffea00',
    wireframe:false,
    speed:0.05,
    angle:0.2,
    penumbra:0,
    intensity:2000
}

gui.addColor(options,'sphereColor').onChange(function(e){
    sphere.material.color.set(e)
})

gui.add(options,'wireframe').onChange((e)=>{
    sphere.material.wireframe = e
})

gui.add(options,'speed',0,0.1).onChange((e)=>{
    options.speed = e
})

gui.add(options,'angle',0,1).onChange((e)=>{
    options.angle = e
})

gui.add(options,'penumbra',0,100).onChange((e)=>{
    options.penumbra = e
})

gui.add(options,'intensity',0,12000).onChange((e)=>{
    options.intensity = e
})

const gridHelper = new THREE.GridHelper(20,1);
scene.add(gridHelper)

let step = 0;

function boxAnimation(time){
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;  
    sphere.rotation.x = -time/1000;
    sphere.rotation.y = -time/1000;
    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.cos(step));

    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    spotLight.angle = options.angle;

    renderer.render(scene,camera)
}

renderer.setAnimationLoop(boxAnimation)

window.addEventListener("resize", function(){
    camera.aspect = this.window.innerWidth/this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(this.window.innerWidth, this.window.innerHeight)
})