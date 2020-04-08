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
          this.object.position.set(
                Math.floor(Math.random()*x),
                Math.floor(Math.random()*y),
                Math.floor(Math.random()*z)
            );

        }


    }


    apple = new Apple();

});