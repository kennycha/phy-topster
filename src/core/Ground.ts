import * as THREE from "three";
import * as CANNON from "cannon-es";
import { textureLoader } from "./loaders";
import { COLORS } from "../constants";
import MyObject from "./MyObject";

const GROUND_SIZE = {
  width: 40,
  height: 0.5,
  depth: 40,
};

export default class Ground extends MyObject {
  mesh: THREE.Mesh;
  body: CANNON.Body;

  constructor(scene: THREE.Scene, world: CANNON.World) {
    super(scene, world);

    const texture = textureLoader.load("wall.jpg");

    const geometry = new THREE.BoxGeometry(GROUND_SIZE.width, GROUND_SIZE.height, GROUND_SIZE.depth);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      color: COLORS.ground,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.mesh = mesh;

    const physicsShape = new CANNON.Box(
      new CANNON.Vec3(GROUND_SIZE.width / 2, GROUND_SIZE.height / 2, GROUND_SIZE.depth / 2)
    );
    const physicsMaterial = new CANNON.Material({
      // @TODO option 조절
      friction: 1,
      restitution: 1.3,
    });
    const body = new CANNON.Body({ shape: physicsShape, material: physicsMaterial, mass: 0 });
    body.position.y = -10;
    this.body = body;
  }

  display() {
    this.scene.add(this.mesh);
    this.world.addBody(this.body);
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
