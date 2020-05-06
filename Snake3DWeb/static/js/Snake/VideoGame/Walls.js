let walls;
   class Walls{
       constructor() {
           this.array = [];
       }
       add(wall){
           this.array.push(wall);
           scene.add(wall);
       }
       didCollideWith(coord,translationError){
        let i;
        for(i in this.array) {
            if (Math.abs(this.array[i].position.x - coord[0]) < translationError &&
                Math.abs(this.array[i].position.y - coord[1]) < translationError &&
                Math.abs(this.array[i].position.z - coord[2]) < translationError) {
                return true;
            }

        }
       }

   }
   class Wall{
     constructor(x,y,z) {
             let material = new THREE.MeshBasicMaterial( { color: 0x333333} ),
                 geometry = new THREE.ConeGeometry( 0.75, 1, 3 );
             this.object = new THREE.Mesh( geometry, material );
             let edges_geometry = new THREE.EdgesGeometry( this.object.geometry ),
                 edges_material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } ),
                 edges = new THREE.LineSegments( edges_geometry, edges_material );
             this.object.add( edges );
             this.object.position.set(x,y,z);
             this.object.scale.set(0.6,0.6,0.6);
        }
    }
    walls = new Walls();

