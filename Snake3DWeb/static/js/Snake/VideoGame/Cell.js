


window.addEventListener('load',()=>{




let geometry_cube = new THREE.BoxGeometry(),
    geometry = new THREE.EdgesGeometry( geometry_cube ),
    material = new THREE.LineBasicMaterial( { color: 0x000000 } );
let wireframe = new THREE.LineSegments( geometry, material );


scene.add(wireframe);





/*Animation of Cell*/
window.CellAnimation = function(){
   wireframe.rotation.x+=0.1;
}


});



