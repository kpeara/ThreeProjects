// Star JS file

var width = window.innerWidth;
var height = window.innerHeight;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
                75, // field of view
                width / height, // aspect ratio
                0.1,
                10000
                );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); // render's size
document.body.appendChild(renderer.domElement);

// make cube adjust to viewport when window is resize
window.addEventListener("resize",function() {

    width = window.innerWidth;
    height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height; // aspect ratio
    camera.updateProjectionMatrix();
});

// allows us to control object with mouse
var controls = new THREE.OrbitControls(camera, renderer.domElement);

var geometry = new THREE.BoxGeometry(2,2,2); // size of cube

var material = [
    new THREE.MeshBasicMaterial({ color: 0xBD7DE3,  side: THREE.DoubleSide, wireframe: false}),
    new THREE.MeshBasicMaterial({ color: 0x28F581, side: THREE.DoubleSide, wireframe: true}),
    new THREE.MeshBasicMaterial({ color: 0x7DD2E3, side: THREE.DoubleSide, wireframe: false}),
    new THREE.MeshBasicMaterial({ color: 0x28F581, side: THREE.DoubleSide, wireframe: true}),
    new THREE.MeshBasicMaterial({ color: 0xED51A1, side: THREE.DoubleSide, wireframe: false}),
    new THREE.MeshBasicMaterial({ color: 0x28F581, side: THREE.DoubleSide, wireframe: true})
];

// var material = new THREE.MeshFaceMaterial( cubeMaterial ); // material to color

var cubeArray = new Array();
var inc = 1;
var c = 1;
var pos = 0
for (var i = 0; i < 750; i++) {
    var cube = new THREE.Mesh(geometry, material); // applies material to geometry
    cube.position.x = pos + -inc * Math.random(); //inc + mx * Math.random();
    cube.position.y = pos + inc * Math.random(); //inc + mx * Math.random();
    cube.position.z = pos + -inc * Math.random() ; //inc + mx * Math.random();
    scene.add(cube); // adds cube to position 0,0,0
    inc = inc + c;
    if (inc > 375) {
        pos = 0;
        inc = -1
        c = -1
    }

    cubeArray.push(cube);
}

var sphereGeometry = new THREE.SphereGeometry(70,70,70);
var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xED51A1, side: THREE.DoubleSide, wireframe: true});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

scene.add(sphere);


camera.position.z = 1000; // move camera back because it is current at (0,0,0) "inside the cube"
camera.position.x = -200; // move camera back because it is current at (0,0,0) "inside the cube"
camera.position.y = 20; // move camera back because it is current at (0,0,0) "inside the cube"

var colorCounter = 0;
var movementCounter = 0;

var incrementX = 0.01;
var incrementY = -0.01;

var positionIncrement = 0.05 * (Math.random() ** 2);


// double click to enable and disable roations
window.addEventListener("click", function(evt) {

    // var coreGeometry = new THREE.SphereGeometry(30,30,30);
    // var coreMaterial = new THREE.MeshBasicMaterial({ color: 0xFF107A, side: THREE.DoubleSide});
    // var core = new THREE.Mesh(coreGeometry, coreMaterial);

    if (evt.detail == 3) {
        if (colorCounter % 2 == 0) {
            for (var i = 0; i < cubeArray.length; i++) {
                for (var j = 0; j < material.length; j++) {
                    
        
                    if (j != 2 && j != 4) {
                        cubeArray[i].material[j].color.setHex(0xFFFFFF);
                    }
                    else {
                        cubeArray[i].material[j].color.setHex(0x000000);
                    }
                    
                    cubeArray[i].material[j].wireframe = false;
                }
            }
        
            sphere.material.color.setHex(0xFF475A);
        }
        else {
            sphere.material.color.setHex(0xED51A1);

            for (var i = 0; i < cubeArray.length; i++) {
                cubeArray[i].material[0].color.setHex(0xBD7DE3);
                
                cubeArray[i].material[1].color.setHex(0x28F581);
                cubeArray[i].material[1].wireframe = true;

                cubeArray[i].material[2].color.setHex(0x7DD2E3);

                cubeArray[i].material[3].color.setHex(0x28F581);
                cubeArray[i].material[3].wireframe = true;

                cubeArray[i].material[4].color.setHex(0xED51A1);

                cubeArray[i].material[5].color.setHex(0x28F581);
                cubeArray[i].material[5].wireframe = true;
            }
        }
        colorCounter++;
    }
    else if (evt.detail == 2) { // double click
        if (movementCounter % 2 == 0) {
            incrementX = 0;
            incrementY = 0;
            positionIncrement = 0;
        }
        else {
            incrementX = 0.01;
            incrementY = -0.01;
            positionIncrement = 0.05 * (Math.random() ** 2);
        }
        movementCounter++;
    }
});

// a render loop, so cube is actually visible
// calling other functions inside this is reccomended
var g = 0;
function animate() {
    requestAnimationFrame(animate);

    for (var i = 0; i < cubeArray.length; i++) {

        cubeArray[i].rotation.x += incrementX;
        cubeArray[i].rotation.y += incrementY;

        if (cubeArray[i].position.x >= 0) {
            cubeArray[i].position.x -= positionIncrement;
        }
        if (cubeArray[i].position.y >= 0) {
            cubeArray[i].position.y -= positionIncrement;
        }
        if (cubeArray[i].position.z >= 0) {
            cubeArray[i].position.z -= positionIncrement;
        }

        if (cubeArray[i].position.x <= 0) {
            cubeArray[i].position.x += positionIncrement;
        }
        if (cubeArray[i].position.y <= 0) {
            cubeArray[i].position.y += positionIncrement;
        }
        if (cubeArray[i].position.z <= 0) {
            cubeArray[i].position.z += positionIncrement;
        }
    }

    renderer.render(scene, camera);
}
animate();
