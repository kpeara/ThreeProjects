// Cube JS file

var width = window.innerWidth;

var height = window.innerHeight;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
                75, // field of view
                width / height, // aspect ratio
                0.1,
                1000
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
var cube = new THREE.Mesh(geometry, material); // applies material to geometry

scene.add(cube); // adds cube to position 0,0,0

camera.position.z = 5; // move camera back because it is current at (0,0,0) "inside the cube"

var incrementX = 0.01;
var incrementY = -0.01;
var counter = 0;

// double click to enable and disable roations
window.addEventListener("dblclick", function() {

    if (counter % 2 == 0) {
        incrementX = 0;
        incrementY = 0;
    }
    else {
        incrementX = 0.01;
        incrementY = -0.01;
    }
    counter++;

});

// a render loop, so cube is actually visible
// calling other functions inside this is reccomended
function animate() {

    requestAnimationFrame(animate);

    cube.rotation.x += incrementX;
    cube.rotation.y += incrementY;

    renderer.render(scene, camera);

}

animate();
