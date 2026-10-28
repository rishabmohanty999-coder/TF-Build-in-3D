import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

const canvas = document.querySelector("#bg");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({
canvas,
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
Math.min(window.devicePixelRatio,2)
);

const sphere = new THREE.Mesh(

new THREE.IcosahedronGeometry(
4,
3
),

new THREE.MeshBasicMaterial({
color:0x00c3ff,
wireframe:true
})

);

scene.add(sphere);

const particleCount = 5000;

const particlesGeometry =
new THREE.BufferGeometry();

const positions =
new Float32Array(
particleCount*3
);

for(let i=0;i<particleCount*3;i++){

positions[i]=(Math.random()-0.5)*200;

}

particlesGeometry.setAttribute(
"position",
new THREE.BufferAttribute(
positions,
3
)
);

const particles =
new THREE.Points(

particlesGeometry,

new THREE.PointsMaterial({

color:0xffffff,
size:0.1

})

);

scene.add(particles);

window.addEventListener(
"resize",
()=>{

camera.aspect=
window.innerWidth/
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}
);

function animate(){

requestAnimationFrame(
animate
);

sphere.rotation.x += 0.003;
sphere.rotation.y += 0.005;

particles.rotation.y += 0.0005;

renderer.render(
scene,
camera
);

}

animate();