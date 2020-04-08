let x = 3, y = 3, z = 3,cell = null;

window.addEventListener('DOMContentLoaded',()=>{

    class Cell{
        constructor(x,y,z) {
            this.blankCoords = [];
            for(let x_it=0;x_it<x;x_it++){
                for(let y_it=0;y_it<y;y_it++){
                    for(let z_it=0;z_it<z;z_it++){
                        this.blankCoords.push([x_it,y_it,z_it]);
                    }
                }
            }

            let geometry_cube = new THREE.BoxGeometry(),
                geometry = new THREE.EdgesGeometry( geometry_cube ),
                material = new THREE.LineBasicMaterial( { color: 0x000000,  transparent:true, opacity:0.6} );
            this.object = new THREE.LineSegments( geometry, material );
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

    }

    cell = new Cell(x,y,z);

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

window.addCellsToScene = function(cell){
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