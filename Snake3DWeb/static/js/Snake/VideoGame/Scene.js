let scene = null,
    canvas = null,
    camera = null,
    renderer = null,
    geometry = null,
    window_relation = window.innerWidth / window.innerHeight;



window.addEventListener("load",()=>{
    //let rx = document.getElementById('rx');
    scene = new THREE.Scene();
    canvas = document.getElementById('canvas');

    camera = new THREE.PerspectiveCamera( 75, window_relation, 0.1, 1000 );

    camera.rotation.order = 'YXZ';
    //camera.rotation.y = - Math.PI / 4;
    //camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );


	renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
	geometry = new THREE.BoxGeometry();
    renderer.setSize( window.innerWidth, window.innerHeight );
    canvas.appendChild( renderer.domElement );

    //let camera_control = new THREE.OrbitControls( camera,renderer.domElement);



    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize(canvas.offsetWidth,canvas.offsetHeight);
    camera.position.set( 0, 0, 5 );

    let animate = function () {
        requestAnimationFrame( animate );

        renderer.render( scene, camera );
    };
    animate();
    
});








