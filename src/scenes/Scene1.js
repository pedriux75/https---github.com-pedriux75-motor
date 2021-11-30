import * as THREE from "../../node_modules/three/build/three.module.js";

class Scene1 extends THREE.Scene {
  
  constructor() {
    super();
    this.create();
  }

  create(){

    // GRID - rejilla
    const gridHelper = new THREE.GridHelper(1000, 1);
    this.add(gridHelper);
    

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0x606060);
    this.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    this.add(directionalLight);
  }


}

export default Scene1;