import * as THREE from "three";
import * as CANNON from "cannon-es";
import { TopsterTypes } from "../types";
import { textureLoader } from "./loaders";

const TOPSTER_SIZE = {
  width: 10,
  height: 10,
  depth: 1,
};

export default class Topster {
  mesh: THREE.Mesh;
  body: CANNON.Body;

  constructor(type: TopsterTypes) {
    const textures = {
      domestic: textureLoader.load("topster_domestic.jpg"),
      overseas: textureLoader.load("topster_overseas.jpg"),
    };

    const geometry = new THREE.BoxGeometry(TOPSTER_SIZE.width, TOPSTER_SIZE.height, TOPSTER_SIZE.depth);
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ map: textures[type] }),
      new THREE.MeshBasicMaterial({ map: textures[type] }),
    ];
    const mesh = new THREE.Mesh(geometry, materials);
    this.mesh = mesh;

    const physicsShape = new CANNON.Box(
      new CANNON.Vec3(TOPSTER_SIZE.width / 2, TOPSTER_SIZE.height / 2, TOPSTER_SIZE.depth / 2)
    );
    const physicsMaterial = new CANNON.Material({
      // @TODO option 조절
      friction: 1,
      restitution: 0.5,
    });
    const body = new CANNON.Body({
      shape: physicsShape,
      material: physicsMaterial,
      mass: 0,
      type: CANNON.BODY_TYPES.DYNAMIC,
    });
    body.position.y = 10;
    body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 6);
    this.body = body;
  }

  display(scene: THREE.Scene, world: CANNON.World) {
    scene.add(this.mesh);
    world.addBody(this.body);
  }

  drop() {
    this.body.mass = 50;
    this.body.updateMassProperties();
  }

  update() {
    this.mesh.position.set(this.body.position.x, this.body.position.y, this.body.position.z);
    this.mesh.quaternion.set(
      this.body.quaternion.x,
      this.body.quaternion.y,
      this.body.quaternion.z,
      this.body.quaternion.w
    );
  }
}
