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

export default class FakeCd extends MyObject {
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
    mesh.position.z = getRandomNumberBetween(-10, 10);
    mesh.name = "cd";
    this.mesh = mesh;

    const physicsShape = new CANNON.Plane();
    const body = new CANNON.Body({ shape: physicsShape, mass: 5 });
    body.position.set(
      getRandomNumberBetween(-10, 10),
      getRandomNumberBetween(-10, 10),
      getRandomNumberBetween(-10, 10)
    );
    this.body = body;
  }

  display() {
    this.scene.add(this.mesh);
    this.world.addBody(this.body);
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.world.removeBody(this.body);
  }

  update() {
    if (this.mesh.position.y <= -9.5) return;
    // cannon-es Plane Shape의 position.z 업데이트 버그로 보임
    this.mesh.position.set(this.body.position.x, this.body.position.y, this.mesh.position.z);
    this.mesh.quaternion.set(
      this.body.quaternion.x,
      this.body.quaternion.y,
      this.body.quaternion.z,
      this.body.quaternion.w
    );
  }
}
