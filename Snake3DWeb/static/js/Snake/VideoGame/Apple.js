let apple = null;
window.addEventListener('DOMContentLoaded', ()=> {

    /*Snake Object Logic*/
    class Apple {
        constructor() {
            this.material = new THREE.MeshBasicMaterial({color: 0xff0000});
            this.appleObject = new THREE.Mesh(new THREE.BoxGeometry(), this.material);
            this.appleObject.position.set(
                Math.floor(Math.random()*x),
                Math.floor(Math.random()*y),
                Math.floor(Math.random()*z)
            );


        }
    }
    apple = new Apple();

});