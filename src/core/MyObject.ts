import * as THREE from "three";
import * as CANNON from "cannon-es";

export default class MyObject {
  scene: THREE.Scene;
  world: CANNON.World;

  constructor(scene: THREE.Scene, world: CANNON.World) {
    this.scene = scene;
    this.world = world;
  }

  display() {}

  update() {}
}
