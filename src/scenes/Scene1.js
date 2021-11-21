import * as THREE from "../../node_modules/three/build/three.module.js";

class Scene1 extends THREE.Scene {
  

  constructor() {
    super();
    this.create();
  }

  create(){
    // ROLL-OVER HELPERS --> te dice donde colocar el objeto

    const rollOverGeo = new THREE.BoxGeometry(50, 50, 50);
    rollOverMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      opacity: 0.5,
      transparent: true,
    });
    
    rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    this.add(rollOverMesh);

    cubeGeo = new THREE.BoxGeometry(50, 50, 50);
    cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xfeb74c,
      map: new THREE.TextureLoader().load(
        "src/assets/textures/square-outline-textured.png"
      ),
    });

    const gridHelper = new THREE.GridHelper(1000, 20);
    this.add(gridHelper);

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2(); // devuelve las cordenadas del puntero

    const geometry = new THREE.PlaneGeometry(1000, 1000);
    geometry.rotateX(-Math.PI / 2);

    plane = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ visible: false })
    );
    this.add(plane);

    objects.push(plane);

    // LIGHTS

    const ambientLight = new THREE.AmbientLight(0x606060);
    this.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    this.add(directionalLight);
  }







}

export default Scene1;