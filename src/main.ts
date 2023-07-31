import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";
import Topster from "./core/Topster";
import Ground from "./core/Ground";
import { COLORS } from "./constants";
import Cd from "./core/Cd";
import FakeCd from "./core/FakeCd";
import { textureLoader } from "./core/loaders";

const TOTAL_CD_COUNT = 42;

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

  const ground = new Ground(scene, world);
  ground.display();

  const textures = {
    domestic: textureLoader.load("topster_domestic.jpg"),
    overseas: textureLoader.load("topster_overseas.jpg"),
  };

  // @TODO topster 종류 state
  const currentTopsterType = "domestic";

  const cds: Cd[] = [];

  const handleTopsterCollide = () => {
    for (let i = 0; i < TOTAL_CD_COUNT; i += 1) {
      if (i % 3) {
        const cd = new Cd(scene, world, textures[currentTopsterType], i);
        cd.display();
        cds.push(cd);
      } else {
        const cd = new FakeCd(scene, world, textures[currentTopsterType], i);
        cd.display();
        cds.push(cd);
      }
    }
  };

  // const cd1 = new Cd(scene, world, textures[currentTopsterType], 0);
  // const cd1 = new Cd(scene, world, textures[currentTopsterType], 0);

  const topster = new Topster(scene, world, textures[currentTopsterType], handleTopsterCollide);
  topster.display();

  // @TODO topster drop 버튼 이벤트
  setTimeout(() => {
    topster.drop();
  }, 300);

  const draw = () => {
    renderer.render(scene, camera);
    controls.update();
    world.step(1 / 60);

    ground.update();
    topster.update();
    cds.forEach((cd) => {
      cd.update();
    });

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
