
window.addEventListener('load',()=>{
    let ob_scene = new THREE.Scene();
    let ob_renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true }),
        ob_canvas = document.getElementById('obstacles-canvas'),
        ob_frame_relation = ob_canvas.offsetWidth/ob_canvas.offsetHeight,
        ob_camera = new THREE.PerspectiveCamera( 28, ob_frame_relation, 1, 1000 );
    ob_camera.position.z=12
    ob_canvas.appendChild( ob_renderer.domElement );
    ob_renderer.setSize(ob_canvas.offsetWidth,ob_canvas.offsetHeight);
    ob_renderer.setClearColor( 0x000000, 0 );

    /*
    //Obstacles identity was initialized in Cell.js
    let obstacles_cube = new THREE.Object3D();
    window.addMatrix3DToElement(obstacles,obstacles_cube);
    ob_scene.add(obstacles_cube);
     */


    let gridHelper = new THREE.GridHelper( x, x );
    gridHelper.rotateX( - Math.PI / 2 );
    ob_scene.add( gridHelper );

    let objects = [];
    let geometry = new THREE.PlaneBufferGeometry( x, x );
    let plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( {visible:false} ));
    ob_scene.add( plane );
    objects.push( plane );


    let raycaster = new THREE.Raycaster(),
        mouse = new THREE.Vector2();


    let animate = function () {
        requestAnimationFrame(animate);
        ob_renderer.render( ob_scene, ob_camera );
    };
    animate();


    function MouseMove(event){
        mouse.set( ( event.clientX / ob_canvas.offsetWidth ) * 2 - 1, - ( event.clientY / ob_canvas.offsetWidth ) * 2 + 1 );
        raycaster.setFromCamera( mouse, ob_camera );
        var intersects = raycaster.intersectObjects( objects );
        if ( intersects.length > 0 ) {
            var intersect = intersects[ 0 ];
            intersect.object.material.color.set( 0xff0000 );
            console.log("INTERSECTEPRRO");
        }
    }
    window.addEventListener( 'mousemove', MouseMove, false );
});

