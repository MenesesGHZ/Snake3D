let x = 5, y = 10, z = 3;

window.addEventListener('load',()=>{
let geometry_cube = new THREE.BoxGeometry(),
    geometry = new THREE.EdgesGeometry( geometry_cube ),
    material = new THREE.LineBasicMaterial( { color: 0x000000,  transparent:true, opacity:0.6} );
let wireframe = new THREE.LineSegments( geometry, material );


let x_index = 0, y_index = 0, z_index = 0,
    wireframeArray = triDimensionalArray(x,y,z);

wireframeArray = cellPositioner(x,y,z,wireframe,wireframeArray);
addCellsToScene(wireframeArray,x,y,z);


/*Animation of Cell*/
window.CellAnimation = function(){
   wireframe.rotation.x+=0.1;
};


});
function triDimensionalArray(x,y,z) {
   let array = Array(x),
       x_index = 0, y_index = 0, z_index = 0;

   for (; x_index < x; x_index++) {
      array[x_index] = Array(y);
      for (; y_index < y; y_index++) {
         array[x_index][y_index] = Array(z);
      }
      y_index = 0;
   }
   return array;
}
function cellPositioner(x,y,z,object,triDimensionalArray){
   let x_index = 0, y_index = 0, z_index = 0;
      for(;x_index<x;x_index++){
               for(;y_index<y;y_index++){
                  for(;z_index<z;z_index++){
                     triDimensionalArray[x_index][y_index][z_index] = object.clone();
                     triDimensionalArray[x_index][y_index][z_index].position.set(x_index,y_index,z_index);
                  }
                  z_index = 0;
               }
               y_index = 0;
            }
      return triDimensionalArray;
   }
   function addCellsToScene(wireframeArray,x,y,z){
      let x_index = 0, y_index = 0, z_index = 0;
      for(;x_index<x;x_index++){
                  for(;y_index<y;y_index++){
                     for(;z_index<z;z_index++){

                        scene.add(wireframeArray[x_index][y_index][z_index]);
                     }
                     z_index = 0;
                  }
                  y_index = 0;
               }
      }