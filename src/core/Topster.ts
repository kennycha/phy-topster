import * as THREE from "three";
import * as CANNON from "cannon-es";
import MyObject from "./MyObject";

const TOPSTER_SIZE = {
  width: 15,
  height: 15,
  depth: 1,
};

export default class Topster extends MyObject {
  mesh: THREE.Mesh;
  body: CANNON.Body;
  isCollided = false;

  constructor(scene: THREE.Scene, world: CANNON.World, texture: THREE.Texture, onCollide: () => void) {
    super(scene, world);

    const geometry = new THREE.BoxGeometry(TOPSTER_SIZE.width, TOPSTER_SIZE.height, TOPSTER_SIZE.depth);
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new THREE.MeshBasicMaterial({ map: texture }),
      new THREE.MeshBasicMaterial({ map: texture }),
    ];
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.name = "topster";
    mesh.position.y = 10;
    mesh.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 6);
    this.mesh = mesh;

    const physicsShape = new CANNON.Box(
      new CANNON.Vec3(TOPSTER_SIZE.width / 2, TOPSTER_SIZE.height / 2, TOPSTER_SIZE.depth / 2)
    );
    const physicsMaterial = new CANNON.Material({
      // @TODO option 조절
      friction: 1,
      restitution: 0.7,
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

    this.body.addEventListener("collide", () => {
      if (this.isCollided) return;
      this.isCollided = true;

      setTimeout(() => {
        onCollide();
        this.dispose();
      }, 1000);
    });
  }

  display() {
    this.scene.add(this.mesh);
    this.world.addBody(this.body);
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.world.removeBody(this.body);
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
