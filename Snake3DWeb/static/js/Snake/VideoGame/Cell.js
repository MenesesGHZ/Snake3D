let x = 4, y = 4, z = 4,cell = null, obstacles=null;

window.addEventListener('DOMContentLoaded',() => {

    class Matrix3D{
        constructor(x,y,z,fill=false,color=0x000000) {
            this.blankCoords = [];
            for(let x_it=0;x_it<x;x_it++){
                for(let y_it=0;y_it<y;y_it++){
                    for(let z_it=0;z_it<z;z_it++){
                        this.blankCoords.push([x_it,y_it,z_it]);
                    }
                }
            }
            let geometry_cube = new THREE.BoxGeometry();
            if(fill){
                 geometry_cube.translate(-(x-1)/2,-(y-1)/2,-(z-1)/2);
                 this.object = new THREE.Mesh( geometry_cube, new THREE.MeshBasicMaterial( { color: color} ) );
                 let geo = new THREE.EdgesGeometry( this.object.geometry ),
                     mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 1 } ),
                     wireframe = new THREE.LineSegments( geo, mat );
                 this.object.add( wireframe );
            }else{
              let geometry = new THREE.EdgesGeometry( geometry_cube ),
                  material = new THREE.LineBasicMaterial( { color: color,  transparent:true, opacity:0.25} );
              this.object = new THREE.LineSegments( geometry, material );
            }
            this.x = x;
            this.y = y;
            this.z = z;
            this.cellsArray = this.createCellsArray();
        }

        createCellsArray(){
               let x_index = 0, y_index = 0, z_index = 0, triDimensionalArray = this.triDimensionalArray();
                  for(;x_index<this.x;x_index++){
                           for(;y_index<this.y;y_index++){
                              for(;z_index<this.z;z_index++){
                                 triDimensionalArray[x_index][y_index][z_index] = this.object.clone();
                                 triDimensionalArray[x_index][y_index][z_index].position.set(x_index,y_index,z_index);
                              }
                              z_index = 0;
                           }
                           y_index = 0;
                        }
                  return triDimensionalArray;
               }

      triDimensionalArray(){
            let array = Array(this.x),
               x_index = 0, y_index = 0, z_index = 0;

            for (; x_index < this.x; x_index++) {
              array[x_index] = Array(this.y);
              for (; y_index < this.y; y_index++) {
                 array[x_index][y_index] = Array(this.z);
              }
              y_index = 0;
            }
            return array;
        };
        blankPositions(){
            let copyBlankCoords = this.blankCoords.slice(),
                snakePositions = snake.takenLocations();
            for(let index=0; index<snakePositions.length;index++) {
                deleteElementFromArrays(snakePositions[index],copyBlankCoords);
            }
            return copyBlankCoords;
        };
        clear(new_x,new_y,new_z){
            cell = new Matrix3D(new_x,new_y,new_z);
        }


    }

    cell = new Matrix3D(x,y,z);
    obstacles = new Matrix3D(x,y,z,true,0x00FF00);

});





function deleteElementFromArrays(element,array){
    for(let index = 0;index<array.length ;index++ ){
        if(element[0] === array[index][0] && element[1] === array[index][1] && element[2] === array[index][2]){
            array.splice(index, 1);
            break;
        }
    }
}

function deleteElement(element,array){
    for(let index = 0;index<array.length ;index++ ){
        if(element === array[index]){
            console.log(element,array[index]);
            array.splice(index, 1);
            break;
        }
    }
}

window.addMatrix3DToElement = function(cell, scene){
              let x_index = 0, y_index = 0, z_index = 0;
              for(;x_index<cell.x;x_index++){
                          for(;y_index<cell.y;y_index++){
                             for(;z_index<cell.z;z_index++){
                                scene.add(cell.cellsArray[x_index][y_index][z_index]);
                             }
                             z_index = 0;
                          }
                          y_index = 0;
                       }
              };
function resize_grid(new_x,new_y,new_z){
    let x_index = 0, y_index = 0, z_index = 0;
    for(;x_index<cell.x;x_index++){
                for(;y_index<cell.y;y_index++){
                   for(;z_index<cell.z;z_index++){
                      scene.remove(cell.cellsArray[x_index][y_index][z_index]);
                   }
                   z_index = 0;
                }
                y_index = 0;
             }
    cell.clear(new_x,new_y,new_z);
    x = new_x; y = new_y; z=new_z;
}


window.addEventListener("load",()=>{
    document.getElementById('input-resize-x').addEventListener('change',element=>{
        new_x = element.target.value;
        resize_grid(new_x,y,z);
        calibrate_cell();
    });

    document.getElementById('input-resize-y').addEventListener('change',element=>{
        new_y = element.target.value;
        resize_grid(x,new_y,z);
        calibrate_cell();
    });

    document.getElementById('input-resize-z').addEventListener('change',element=>{
        new_z = element.target.value;
        resize_grid(x,y,new_z);
        calibrate_cell()
    });
    function calibrate_cell(){
        addMatrix3DToElement(cell,scene);
        if(!snake.user_mode || !play) scene.position.set(-(x-1)/2,-(y-1)/2,-(z-1)/2);
        window.wall_selector_resize();
    }
});