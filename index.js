import * as THREE from 'three';

// create a scene
const scene = new THREE.Scene();
// create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// create a renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
// set color
renderer.setClearColor('#e5e5e5');
// set size (perferred to the window)
renderer.setSize(window.innerWidth, window.innerHeight);
// append to DOM
document.body.appendChild( renderer.domElement );
