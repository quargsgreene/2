/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
import * as THREE from 'https://unpkg.com/three@0.134.0/build/three.module.js';
import { DragControls } from 'https://unpkg.com/three@0.134.0/examples/jsm/controls/DragControls.js';

// start button
const start = document.getElementById('play');
start.crossOrigin = 'anonymous';
start.addEventListener('click', main);

function main() {
  // scene, lights, camera
  start.remove();

  const scene = new THREE.Scene();
  const canvas = document.querySelector('#c');
  const listener = new THREE.AudioListener();
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    preserveDrawingBuffer: true,

  });

  renderer.setClearColor(0xa3ddff);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  window.addEventListener('resize', onWindowResize);
  document.addEventListener('click', onClick);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  const col = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(col, intensity);
  light.position.set(0, 50, 20);
  scene.add(light);

  const fov = 100;
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const near = 0.1;
  const far = 10000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-5, 0, 10);

  // play sound

  const soundFile = 'sex-appeal.mp3';
  const audioLoader = new THREE.AudioLoader();
  const sound = new THREE.PositionalAudio(listener);
  audioLoader.load(soundFile, (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.play();
  });

  // skin
  const texLoader = new THREE.TextureLoader();

  const texture1 = texLoader.load('texture-1.jpg', (texture) => {
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
  });

  const texture2 = texLoader.load('texture-2.jpg', (texture) => {
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
  });

  const texture3 = texLoader.load('texture-3.jpg', (texture) => {
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
  });

  // body parts
  const size = 0.05;

  const bodyParts = [];

  const pelvisSphereRadius = 10 * size;
  const widthSegments = 64;
  const heightSegments = 32;
  const pelvisSphereMaterial = new THREE.MeshBasicMaterial({ map: texture2 });
  // eslint-disable-next-line max-len
  const pelvisSphereBufferGeometry = new THREE.SphereBufferGeometry(pelvisSphereRadius, widthSegments, heightSegments);
  const pelvisSphereMesh = new THREE.Mesh(pelvisSphereBufferGeometry, pelvisSphereMaterial);
  pelvisSphereMesh.position.set(0, 0, 0);
  scene.add(pelvisSphereMesh);
  bodyParts.push(pelvisSphereMesh);

  const pelvisTorusKnotRadius = 15 * size;
  const pelvisTorusKnotTubeRadius = 0.6 * size;
  const tubularSegments = 64;
  const radialSegments = 8;
  const pelvisP = 2;
  const pelvisQ = 3;
  // eslint-disable-next-line max-len
  const pelvisTorusKnotBufferGeometry = new THREE.TorusKnotBufferGeometry(pelvisTorusKnotRadius, pelvisTorusKnotTubeRadius, tubularSegments, radialSegments, pelvisP, pelvisQ);
  const pelvisTorusKnotMaterial = new THREE.MeshBasicMaterial({ map: texture3 });
  const pelvisTorusKnotMesh = new THREE.Mesh(pelvisTorusKnotBufferGeometry, pelvisTorusKnotMaterial);
  pelvisTorusKnotMesh.position.set(0, 0, 0);
  scene.add(pelvisTorusKnotMesh);
  bodyParts.push(pelvisTorusKnotMesh);

  class spiralLimbCurve extends THREE.Curve {
    constructor(scale = 1) {
      super();
      this.scale = scale;
    }

    getPoint(t, optionalTarget = new THREE.Vector3()) {
      const tx = 3 * Math.cos(10 * Math.PI * t);
      const ty = 20 * t;
      const tz = 3 * Math.sin(10 * Math.PI * t);

      return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
    }
  }

  const SpiralLimbPath = new spiralLimbCurve(size);
  const spiralLimbRadius = size;
  const spiralLimbSegments = 100;
  const spiralLimbRadialSegments = 20;
  // eslint-disable-next-line max-len
  const spiralLimbBufferGeometry = new THREE.TubeBufferGeometry(SpiralLimbPath, spiralLimbSegments, spiralLimbRadius, spiralLimbRadialSegments, false);
  const spiralLimbMaterial = new THREE.MeshPhongMaterial({ color: 0x1157b3 });
  const spiralLimbMesh = new THREE.Mesh(spiralLimbBufferGeometry, spiralLimbMaterial);
  spiralLimbMesh.position.set(size * 0.62, size * -8.43, size * 10.64);
  spiralLimbMesh.rotation.x = (3 * Math.PI) / 4;
  scene.add(spiralLimbMesh);
  bodyParts.push(spiralLimbMesh);

  const tipRadius1 = 2 * size;
  const tipSphereMaterial1 = new THREE.MeshBasicMaterial({ map: texture2 });
  const tipSphereBufferGeometry1 = new THREE.SphereBufferGeometry(tipRadius1, widthSegments, heightSegments);
  const tipMesh1 = new THREE.Mesh(tipSphereBufferGeometry1, tipSphereMaterial1);
  tipMesh1.position.set(size * 3.7, size * -22, size * 25.9);
  scene.add(tipMesh1);
  bodyParts.push(tipMesh1);

  const tipRadius2 = 2 * size;
  const tipSphereMaterial2 = new THREE.MeshPhongMaterial({ color: 0x389554 });
  const tipSphereBufferGeometry2 = new THREE.SphereBufferGeometry(tipRadius2, widthSegments, heightSegments);
  const tipMesh2 = new THREE.Mesh(tipSphereBufferGeometry2, tipSphereMaterial2);
  tipMesh2.position.set(size * 3.7, size * -8, size * 10.9);
  scene.add(tipMesh2);
  bodyParts.push(tipMesh2);

  const cystRadius1 = 4 * size;
  const cystSphereMaterial1 = new THREE.MeshBasicMaterial({ map: texture2 });
  const cystSphereBufferGeometry1 = new THREE.SphereBufferGeometry(cystRadius1, widthSegments, heightSegments);
  const cystMesh1 = new THREE.Mesh(cystSphereBufferGeometry1, cystSphereMaterial1);
  cystMesh1.position.set(size * 2.07, size * -12.43, 0);
  scene.add(cystMesh1);
  bodyParts.push(cystMesh1);

  const cystRadius2 = 3 * size;
  const cystSphereMaterial2 = new THREE.MeshBasicMaterial({ map: texture2 });
  const cystSphereBufferGeometry2 = new THREE.SphereBufferGeometry(cystRadius2, widthSegments, heightSegments);
  const cystMesh2 = new THREE.Mesh(cystSphereBufferGeometry2, cystSphereMaterial2);
  cystMesh2.position.set(size * -3.01, size * -10.3, 0);
  scene.add(cystMesh2);
  bodyParts.push(cystMesh2);

  const buttRadius1 = 8 * size;
  const buttSphereMaterial1 = new THREE.MeshBasicMaterial({ map: texture2 });
  const buttSphereBufferGeometry1 = new THREE.SphereBufferGeometry(buttRadius1, widthSegments, heightSegments);
  const buttMesh1 = new THREE.Mesh(buttSphereBufferGeometry1, buttSphereMaterial1);
  buttMesh1.position.set(size * 8.11, 0, size * -6.65);
  scene.add(buttMesh1);
  bodyParts.push(buttMesh1);

  const buttRadius2 = 9 * size;
  const buttSphereMaterial2 = new THREE.MeshBasicMaterial({ map: texture2 });
  const buttSphereBufferGeometry2 = new THREE.SphereBufferGeometry(buttRadius2, widthSegments, heightSegments);
  const buttMesh2 = new THREE.Mesh(buttSphereBufferGeometry2, buttSphereMaterial2);
  buttMesh2.position.set(size * -7.3, 0, size * -8.18);
  scene.add(buttMesh2);
  bodyParts.push(buttMesh2);

  const buttNippleTorusKnotRadius = size;
  const buttNippleTorusKnotTubeRadius = 0.1 * size;
  const buttNippleP = 5;
  const buttNippleQ = 6;
  // eslint-disable-next-line max-len
  const buttNippleTorusKnotBufferGeometry = new THREE.TorusKnotBufferGeometry(buttNippleTorusKnotRadius, buttNippleTorusKnotTubeRadius, tubularSegments, radialSegments, buttNippleP, buttNippleQ);
  const buttNippleTorusKnotMaterial = new THREE.MeshPhongMaterial({ color: 0xfff700 });
  // eslint-disable-next-line max-len
  const buttNippleTorusKnotMesh = new THREE.Mesh(buttNippleTorusKnotBufferGeometry, buttNippleTorusKnotMaterial);
  buttNippleTorusKnotMesh.position.set(size * 11.62, size * 2.1, size * -14.38);
  scene.add(buttNippleTorusKnotMesh);
  bodyParts.push(buttNippleTorusKnotMesh);

  const torsoShape = new THREE.Shape();
  const x = 0;
  const y = size * 15;
  torsoShape.moveTo(x + size * 5, y + size * 20);
  torsoShape.bezierCurveTo(x + size * 5, y + size * 20, x + size * 3, y + size * 10, x, y);
  // eslint-disable-next-line max-len
  torsoShape.bezierCurveTo(x - size * 7, y, x - size * 4, y + size * 2, x - size * 2.5, y - size * 6);
  torsoShape.bezierCurveTo(x + size * 5, y + size * 20, x + size * 3, y + size * 10, x, y);
  torsoShape.bezierCurveTo(x - size * 8, y, x + size * 60, y - size * 2, x, y);
  torsoShape.bezierCurveTo(x + size * 10, y + size * 10, x - size * 4, y, x + size * 2, y);
  // eslint-disable-next-line max-len
  torsoShape.bezierCurveTo(x - size * 12, y - size * 14, x + size * 17, y, x - size * 200, y - size * 30);

  const torsoExtrudeSettings = {
    steps: 4,
    depth: 4,
    bevelEnabled: true,
    bevelSize: 6,
    bevelSegments: 3,
  };

  const torsoBufferGeometry = new THREE.ExtrudeBufferGeometry(torsoShape, torsoExtrudeSettings);
  const torsoMaterial = new THREE.MeshBasicMaterial({ map: texture3 });
  const torsoMesh = new THREE.Mesh(torsoBufferGeometry, torsoMaterial);
  torsoMesh.position.set(4 * size, 30 * size, 0);
  torsoMesh.rotation.y = (3 * Math.PI) / 2;
  torsoMesh.scale.set(size, 3 * size, 3 * size);
  scene.add(torsoMesh);
  bodyParts.push(torsoMesh);

  const navelSphereRadius = 2.1 * size;
  const navelSphereMaterial = new THREE.MeshPhongMaterial({ color: 0x4fce73 });
  const navelSphereBufferGeometry = new THREE.SphereBufferGeometry(navelSphereRadius, widthSegments, heightSegments);
  const navelSphereMesh = new THREE.Mesh(navelSphereBufferGeometry, navelSphereMaterial);
  navelSphereMesh.position.set(0, size * 20.45, size * 6);
  scene.add(navelSphereMesh);
  bodyParts.push(navelSphereMesh);

  const breastSphereRadius1 = 7.1 * size;
  const breastSphereMaterial1 = new THREE.MeshBasicMaterial({ map: texture3 });
  const breastSphereBufferGeometry1 = new THREE.SphereBufferGeometry(breastSphereRadius1, widthSegments, heightSegments);
  const breastSphereMesh1 = new THREE.Mesh(breastSphereBufferGeometry1, breastSphereMaterial1);
  breastSphereMesh1.position.set(9.76 * size, size * 45.34, size * 4.38);
  scene.add(breastSphereMesh1);
  bodyParts.push(breastSphereMesh1);

  const breastSphereRadius2 = 6.1 * size;
  const breastSphereMaterial2 = new THREE.MeshBasicMaterial({ map: texture1 });
  const breastSphereBufferGeometry2 = new THREE.SphereBufferGeometry(breastSphereRadius2, widthSegments, heightSegments);
  const breastSphereMesh2 = new THREE.Mesh(breastSphereBufferGeometry2, breastSphereMaterial2);
  breastSphereMesh2.position.set(-13.76 * size, size * 40.34, size * 4.38);
  scene.add(breastSphereMesh2);
  bodyParts.push(breastSphereMesh2);

  const nippleTorusKnotRadius = 2 * size;
  const nippleTorusKnotTubeRadius = 0.3 * size;
  const nippleP = 7;
  const nippleQ = 9;
  const nippleTorusKnotBufferGeometry = new THREE.TorusKnotBufferGeometry(nippleTorusKnotRadius, nippleTorusKnotTubeRadius, tubularSegments, radialSegments, nippleP, nippleQ);
  const nippleTorusKnotMaterial = new THREE.MeshPhongMaterial({ color: 0x1969d1 });
  const nippleTorusKnotMesh = new THREE.Mesh(nippleTorusKnotBufferGeometry, nippleTorusKnotMaterial);
  nippleTorusKnotMesh.position.set(-13.76 * size, size * 40.34, size * 10.38);
  scene.add(nippleTorusKnotMesh);
  bodyParts.push(nippleTorusKnotMesh);

  const nippleConeRadius = 1.1 * size;
  const nippleConeHeight = 10.2 * size;
  const nippleConeHeightSegments = 3;
  const nippleConeBufferGeometry = new THREE.ConeBufferGeometry(nippleConeRadius, nippleConeHeight, radialSegments, nippleConeHeightSegments);
  const nippleConeMaterial = new THREE.MeshPhongMaterial({ color: 0xc4aa00 });
  const nippleConeMesh = new THREE.Mesh(nippleConeBufferGeometry, nippleConeMaterial);
  nippleConeMesh.position.set(-13.76 * size, size * 40.34, size * 10.38);
  nippleConeMesh.rotation.x = Math.PI / 2;
  scene.add(nippleConeMesh);
  bodyParts.push(nippleConeMesh);

  const legRadius = 2 * size;
  const legHeight = 80 * size;
  const legRadialSegments = 7;
  const legBufferGeometry = new THREE.CylinderBufferGeometry(legRadius, legRadius, legHeight, legRadialSegments, heightSegments);
  const legMaterial = new THREE.MeshBasicMaterial({ map: texture3 });
  const legMesh = new THREE.Mesh(legBufferGeometry, legMaterial);
  legMesh.position.set(0, 0, 0);
  scene.add(legMesh);
  bodyParts.push(legMesh);

  const footBoxWidth1 = 15 * size;
  const footBoxHeight1 = 10 * size;
  const footBoxDepth1 = 20 * size;
  const footBufferGeometry1 = new THREE.BoxBufferGeometry(footBoxWidth1, footBoxHeight1, footBoxDepth1);
  const footMaterial1 = new THREE.MeshBasicMaterial({ map: texture2 });
  const footMesh1 = new THREE.Mesh(footBufferGeometry1, footMaterial1);
  footMesh1.position.set(-15 * size, -50 * size, 0);
  scene.add(footMesh1);
  bodyParts.push(footMesh1);

  const footBoxWidth2 = 15 * size;
  const footBoxHeight2 = 20 * size;
  const footBoxDepth2 = 20 * size;
  const footBufferGeometry2 = new THREE.BoxBufferGeometry(footBoxWidth2, footBoxHeight2, footBoxDepth2);
  const footMaterial2 = new THREE.MeshBasicMaterial({ map: texture2 });
  const footMesh2 = new THREE.Mesh(footBufferGeometry2, footMaterial2);
  footMesh2.position.set(15 * size, -50 * size, 0);
  scene.add(footMesh2);
  bodyParts.push(footMesh2);

  const armBoxWidth1 = 40 * size;
  const armBoxHeight1 = 15 * size;
  const armBoxDepth1 = 20 * size;
  const armBufferGeometry1 = new THREE.BoxBufferGeometry(armBoxWidth1, armBoxHeight1, armBoxDepth1);
  const armMaterial1 = new THREE.MeshBasicMaterial({ map: texture1 });
  const armMesh1 = new THREE.Mesh(armBufferGeometry1, armMaterial1);
  armMesh1.position.set(-40 * size, 0, 0);
  scene.add(armMesh1);
  bodyParts.push(armMesh1);

  const armBoxWidth2 = 30 * size;
  const armBoxHeight2 = 30 * size;
  const armBoxDepth2 = 30 * size;
  const armBufferGeometry2 = new THREE.BoxBufferGeometry(armBoxWidth2, armBoxHeight2, armBoxDepth2);
  const armMaterial2 = new THREE.MeshBasicMaterial({ map: texture1 });
  const armMesh2 = new THREE.Mesh(armBufferGeometry2, armMaterial2);
  armMesh2.position.set(40 * size, 0, 0);
  scene.add(armMesh2);
  bodyParts.push(armMesh2);

  const musicBoxSize = 30 * size;
  const musicBoxBufferGeometry = new THREE.BoxBufferGeometry(musicBoxSize, musicBoxSize, musicBoxSize);
  const musicBoxMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
  const musicBoxMesh = new THREE.Mesh(musicBoxBufferGeometry, musicBoxMaterial);
  musicBoxMesh.position.set(-100 * size, 40 * size, 0);
  scene.add(musicBoxMesh);
  bodyParts.push(musicBoxMesh);
  musicBoxMesh.add(sound);

  // dragging

  const dControls = new DragControls([...bodyParts], camera, renderer.domElement);
  dControls.addEventListener('drag', render);
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  let group;
  let enableSelection = false;

  function onKeyDown(e) {
    enableSelection = e.keyCode === 16;
  }

  function onKeyUp() {
    enableSelection = false;
  }

  function onClick(e) {
    e.preventDefault();
    if (enableSelection === true) {
      const draggableObjects = dControls.getObjects();
      draggableObjects.length = 0;
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersections = raycaster.intersectObject(bodyParts, true);
      if (intersections.length > 0) {
        const { object } = intersections[0];
        if (group.children.includes(object) === true) {
          object.material.emissive.set(0x000000);
          scene.attach(object);
        } else {
          object.material.emissive.set(0xaaaaaa);
          group.attach(object);
        }
        dControls.transformGroup = true;
        draggableObjects.push(group);
      }
      if (group.children.length === 0) {
        dControls.transformGroup = false;
        draggableObjects.push(...bodyParts);
      }
    }
    render();
  }
  // render
  renderer.render(scene, camera);
  requestAnimationFrame(render);

  function render(time) {
    time *= 0.001;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
}
