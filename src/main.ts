import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";
import Topster from "./core/Topster";
import Ground from "./core/Ground";
import { COLORS } from "./constants";

const init = () => {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const app = document.querySelector("#app");
  if (!app) return;
  app.appendChild(renderer.domElement);

  const clock = new THREE.Clock();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COLORS.scene);

  const world = new CANNON.World();
  world.broadphase = new CANNON.SAPBroadphase(world);
  world.gravity.set(0, -9.82, 0);
  world.allowSleep = true;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 10, 30);
  scene.add(camera);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 5;
  controls.maxDistance = 40;

  const ground = new Ground();
  ground.display(scene, world);

  // @TODO topster 종류 state
  const topster = new Topster("domestic");
  topster.display(scene, world);

  // @TODO topster drop 버튼 이벤트
  setTimeout(() => {
    topster.drop();
  }, 1000);

  const draw = () => {
    const delta = clock.getDelta();
    renderer.render(scene, camera);
    controls.update();
    world.step(delta);

    ground.update();
    topster.update();

    requestAnimationFrame(draw);
  };

  draw();

  const handleResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  window.addEventListener("resize", handleResize);
};

window.addEventListener("load", init);