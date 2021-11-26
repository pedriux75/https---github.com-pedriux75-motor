import * as THREE from "../../node_modules/three/build/three.module.js";

class Product extends THREE.Mesh{

    constructor(){
        super();
        this.create();
    }

    create(){

        this.geometry = new THREE.BoxGeometry(50, 50, 50);
        this.material = new THREE.MeshLambertMaterial({
            color: 0xfeb74c,
            map: new THREE.TextureLoader().load(
                "src/assets/textures/square-outline-textured.png"
            ),
        });
    }

    createRollOver(){

        const rollOverGeo = this.geometry;
        const rollOverMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            opacity: 0.5,
            transparent: true,
        });
        
        let rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
        return rollOverMesh;
        
    }




}

export default Product;