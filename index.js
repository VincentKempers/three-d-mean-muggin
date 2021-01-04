import * as THREE from 'three';
import { gsap } from "gsap";

// create a scene
const scene = new THREE.Scene();
// create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// set position
camera.position.z = 5;
// create a renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
// set color
renderer.setClearColor('#e5e5e5');
// set size (perferred to the window)
renderer.setSize(window.innerWidth, window.innerHeight);
// append to DOM
document.body.appendChild(renderer.domElement);
// on resize it has to change
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
});

renderer.render(scene, camera);
// set raycaster
const raycaster = new THREE.Raycaster();
// set vector2
const mouse = new THREE.Vector2();
// set geometry for the box
const geometry = new THREE.BoxGeometry(1, 1 , 1);
// set material
const material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
// set the mesh on the box
const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere);
renderer.render(scene, camera);

// set light
const light = new THREE.PointLight(0xFFFFF, 1, 500);
light.position.set(10,0,25);

// add light
scene.add(light);

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// gsap timeline
const tl = gsap.timeline({repeatDelay: .3});

// mouseanimation
function onMouseMove(event) {
    event.preventDefault();
    // get the current mouse positions
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // add raycaster mouse + camera
    raycaster.setFromCamera(mouse, camera);
    // intersects
    var intersects = raycaster.intersectObjects(scene.children);
    function setNumber() {
        return {x: Math.floor(Math.random() * 10)}
    };
    // set the animations on click
    for (var i = 0; i < intersects.length; i++) {
        // gsap animation setup
        console.log(setNumber().x);
        tl.to(intersects[i].object.scale, 1, {x: setNumber().x, ease: 'elastic'})
        tl.to(intersects[i].object.scale, 1, {x: setNumber().x, ease: 'elastic'})
        tl.to(intersects[i].object.scale, .5, {x: .5, ease: 'elastic'})
        tl.to(intersects[i].object.position, 1, {x: 3, ease: 'easeout'})
        tl.to(intersects[i].object.scale, 1, {x: 2, ease: 'elastic'})
        tl.to(intersects[i].object.scale, 1, {x: 3, ease: 'easeout'})
        tl.to(intersects[i].object.position, 1, {x: 0, ease: 'easeout'})
        tl.to(intersects[i].object.scale, 1, {x: 1, ease: 'elastic'})
        tl.to(intersects[i].object.scale, 1, {y: 2, ease: 'elastic'})
    }
}
// animate
animate();

// set click
window.addEventListener('click', onMouseMove);



