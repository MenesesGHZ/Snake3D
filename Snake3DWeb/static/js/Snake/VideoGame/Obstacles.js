window.addEventListener('load',()=>{
    let ob_scene = new THREE.Scene();
    let ob_renderer = new THREE.WebGLRenderer(),
        ob_canvas = document.getElementById('obstacles-canvas'),
        ob_frame_relation = ob_canvas.offsetWidth/ob_canvas.offsetHeight,
        ob_camera = new THREE.PerspectiveCamera( 32, ob_frame_relation, 0.01, 1000 );
    ob_camera.position.z=20
    ob_canvas.appendChild( ob_renderer.domElement );
    ob_renderer.setSize(ob_canvas.offsetWidth,ob_canvas.offsetHeight);
    ob_scene.position.set(-(x-1)/2,-(y-1)/2,-(z-1)/2);


    //Obstacles identity was initialized in Cell.js
    let obstacles_cube = new THREE.Object3D();
    window.addMatrix3DToElement(obstacles,obstacles_cube);
    ob_scene.add(obstacles_cube);
    obstacles_cube.translate.x+=2


    let animate = function () {
        requestAnimationFrame(animate);
        obstacles_cube.rotation.y+=0.1
        ob_renderer.render( ob_scene, ob_camera );
    };
    animate();

});