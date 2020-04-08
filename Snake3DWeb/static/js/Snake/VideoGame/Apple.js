let apple = null;
window.addEventListener('DOMContentLoaded', ()=> {

    /*Snake Object Logic*/
    class Apple {
        constructor() {
            this.material = new THREE.MeshBasicMaterial({color: 0xff0000});
            this.object = new THREE.Mesh(new THREE.BoxGeometry(), this.material);
            this.object.scale.set(0.55,0.55,0.55);
            this.setNewPosition();
        }

        setNewPosition(){
            let blankPositions = cell.blankPositions(),
                index = Math.floor(Math.random()*blankPositions.length);
            this.object.position.set(
                blankPositions[index][0],
                blankPositions[index][1],
                blankPositions[index][2]
            );

        }


    }


    apple = new Apple();

});