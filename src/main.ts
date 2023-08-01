import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";
import Topster from "./core/Topster";
import Ground from "./core/Ground";
import { COLORS } from "./constants";
import Cd from "./core/Cd";
import FakeCd from "./core/FakeCd";
import { textureLoader } from "./core/loaders";
import { observable, observe } from "./state/observer";
import { TopsterTypes } from "./types";

const TOTAL_CD_COUNT = 42;

interface AppState {
  currentTopsterType: TopsterTypes;
}

const init = () => {
  const appState = observable<AppState>({
    currentTopsterType: "domestic",
  });

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const app = document.querySelector("#app");
  const changeButton = document.querySelector("#changeButton") as HTMLButtonElement;
  const overseasIcon = document.querySelector("#overseasIcon") as HTMLImageElement;
  const domesticIcon = document.querySelector("#domesticIcon") as HTMLImageElement;
  if (!app || !changeButton || !overseasIcon || !domesticIcon) return;
  app.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COLORS.scene);

  const world = new CANNON.World();
  world.broadphase = new CANNON.SAPBroadphase(world);
  world.gravity.set(0, -9.82, 0);
  world.allowSleep = true;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(4.3182, 11.2631, 33.9303);
  scene.add(camera);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(-0.3205, -4.6623, 1.9448);
  controls.minDistance = 5;
  controls.maxDistance = 40;

  const ground = new Ground(scene, world);
  ground.display();

  const textures = {
    domestic: textureLoader.load("topster_domestic.jpg"),
    overseas: textureLoader.load("topster_overseas.jpg"),
  };

  let topster: Topster;
  let cds: Cd[] = [];

  const handleTopsterCollide = () => {
    for (let i = 0; i < TOTAL_CD_COUNT; i += 1) {
      if (i % 3) {
        const cd = new Cd(scene, world, textures[appState.currentTopsterType], i);
        cd.display();
        cds.push(cd);
      } else {
        const cd = new FakeCd(scene, world, textures[appState.currentTopsterType], i);
        cd.display();
        cds.push(cd);
      }
    }
  };

  const displayObjects = (topsterType: TopsterTypes) => {
    topster = new Topster(scene, world, textures[topsterType], handleTopsterCollide);
    topster.display();
  };

  const clearObjects = () => {
    if (topster) {
      topster.dispose();
    }

    cds.forEach((cd) => {
      cd.dispose();
    });
    cds = [];
  };

  observe(() => {
    clearObjects();
    displayObjects(appState.currentTopsterType);

    setTimeout(() => {
      topster.drop();
    }, 200);
  });

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

  const handleChangeButtonClick = () => {
    if (appState.currentTopsterType === "domestic") {
      overseasIcon.style.display = "none";
      domesticIcon.style.display = "block";
      appState.currentTopsterType = "overseas";
    } else {
      overseasIcon.style.display = "block";
      domesticIcon.style.display = "none";
      appState.currentTopsterType = "domestic";
    }
  };

  const handleResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  window.addEventListener("resize", handleResize);
  changeButton.addEventListener("click", handleChangeButtonClick);
};

window.addEventListener("load", init);
