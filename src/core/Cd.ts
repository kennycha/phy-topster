import * as THREE from "three";
import * as CANNON from "cannon-es";
import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";
import MyObject from "./MyObject";
import { getRandomNumberBetween } from "../utils";

const CD_SIZE = {
  radius: 1,
  height: 0.1,
};

export default class Cd extends MyObject {
  mesh: THREE.Mesh;
  body: CANNON.Body;

  constructor(scene: THREE.Scene, world: CANNON.World, texture: THREE.Texture, order: number) {
    super(scene, world);

    let scaleFactor;
    if (order < 10) {
      scaleFactor = 2.25;
    } else if (order < 22) {
      scaleFactor = 1.5;
    } else {
      scaleFactor = 1;
    }

    const geometry = new THREE.CylinderGeometry(
      CD_SIZE.radius * scaleFactor,
      CD_SIZE.radius * scaleFactor,
      CD_SIZE.height,
      32
    );
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uOrder: { value: order },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = "cd";
    this.mesh = mesh;

    const physicsShape = new CANNON.Cylinder(
      CD_SIZE.radius * scaleFactor,
      CD_SIZE.radius * scaleFactor,
      CD_SIZE.height,
      32
    );
    const physicsMaterial = new CANNON.Material({
      friction: 0.3,
      restitution: 0.5,
    });
    const body = new CANNON.Body({
      shape: physicsShape,
      material: physicsMaterial,
      mass: 5,
    });
    body.position.set(
      getRandomNumberBetween(-10, 10),
      getRandomNumberBetween(-10, 10),
      getRandomNumberBetween(-10, 10)
    );
    body.quaternion.setFromEuler(
      getRandomNumberBetween(0, 1),
      getRandomNumberBetween(0, 1),
      getRandomNumberBetween(0, 1)
    );
    this.body = body;
  }

  display() {
    this.scene.add(this.mesh);
    this.world.addBody(this.body);
    this.body.applyImpulse(new CANNON.Vec3(0, 1.3, 0), this.body.position);
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.world.removeBody(this.body);
  }

  update() {
    if (this.body.velocity.distanceTo(new CANNON.Vec3(0, 0, 0)) < 0.5) return;
    this.mesh.position.set(this.body.position.x, this.body.position.y, this.body.position.z);
    this.mesh.quaternion.set(
      this.body.quaternion.x,
      this.body.quaternion.y,
      this.body.quaternion.z,
      this.body.quaternion.w
    );
  }
}
