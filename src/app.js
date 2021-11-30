import * as THREE from '../node_modules/three/build/three.module.js';
// import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import Scene1 from './scenes/Scene1.js';
import Product from './products/Product.js';

const container = document.querySelector('#motor-content');

// VARIABLES
let camera, scene, renderer;
let plane;
let pointer, raycaster, isShiftDown = false;

let rollOverMesh;
// let cubeGeo, cubeMaterial;

let controls, reloj;

const objects = [];


init();
render();

function init() {

    // SCENE
    scene = new Scene1();
    scene.background = new THREE.Color( 0xf0f0f0 );

    // CAMERA
    camera = new THREE.PerspectiveCamera( 
        45, // fov --> campo de vision (en grados, 1-179)
        window.innerWidth / window.innerHeight, // aspect ratio
        1, // near --> min. para renderizar
        10000 // far --> max. para renderizar
    );

    camera.position.set( 500, 800, 1300 );
    camera.lookAt( 0, 0, 0 );

    // ROLL-OVER HELPERS --> te dice donde colocar el objeto
    let product = new Product();
    rollOverMesh = product.createRollOver();
    scene.add(rollOverMesh);
    
    
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2(); // devuelve las cordenadas del puntero
    // console.log(pointer);

    const geometry = new THREE.PlaneGeometry(1000, 1000);
    geometry.rotateX(-Math.PI / 2);

    plane = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ visible: true })
      
    );
    scene.add(plane);

    objects.push(plane);
    // objects[0].name = 'NOMBRE_MUEBLE'; --> REALIZAR PETICION A LA BBDD para insetar
    console.log(objects);


    // RENDER
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        canvas: container
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    // EVENT LISTENER
    document.addEventListener( 'pointermove', onPointerMove );
    document.addEventListener( 'pointerdown', onPointerDown );
    document.addEventListener( 'keydown', onDocumentKeyDown );
    document.addEventListener( 'keyup', onDocumentKeyUp );

    // EVENT LISTENER --> RESIZE
    window.addEventListener( 'resize', onWindowResize );
    

}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}


function onPointerMove( event ) {

    pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

    raycaster.setFromCamera( pointer, camera );

    const intersects = raycaster.intersectObjects( objects, false );
    
    if ( intersects.length > 0 ) {

        const intersect = intersects[ 0 ];

        rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
        
        // Pararesolver colisiones
        rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );

    }

    render();

}


function onPointerDown( event ) {

    pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
    
    raycaster.setFromCamera( pointer, camera );
    
    const intersects = raycaster.intersectObjects( objects, false );
    
    if ( intersects.length > 0 ) {

        const intersect = intersects[ 0 ];

        // DELETE CUBE

        if ( isShiftDown ) {

            if ( intersect.object !== plane ) {

                scene.remove( intersect.object );

                objects.splice( objects.indexOf( intersect.object ), 1 );

            }

            // CREATE CUBE

        } else {

            const voxel = new Product();
            // Hacer petición a la BBDD para recoger medidas

            voxel.position.copy( intersect.point ).add( intersect.face.normal );
            console.log(intersect.point);
            console.log(intersect.face.normal);
            voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 ); // ancho x alto x grosor
            scene.add( voxel );

            objects.push( voxel );

        }

        render();

    }

}

// 
function onDocumentKeyDown( event ) {

    switch ( event.keyCode ) {

        case 16: isShiftDown = true; 
        break;

    }

}

function onDocumentKeyUp( event ) {

    switch ( event.keyCode ) {

        case 16: isShiftDown = false; 
        break;

    }

}

function render() {

    // OrbitControls
    // requestAnimationFrame(render);
    // controls.update();

    renderer.render( scene, camera );

}
