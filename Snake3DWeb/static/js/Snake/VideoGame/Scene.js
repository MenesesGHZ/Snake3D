let scene = null,
    window_relation = window.innerWidth / window.innerHeight;


window.addEventListener('load',()=>{
    //let rx = document.getElementById('rx');
    scene = new THREE.Scene();
    let renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true }),
        canvas = document.getElementById('canvas'),
        camera = new THREE.PerspectiveCamera( 75, window_relation, 0.1, 1000 );
    camera.position.set( 6, 6, 6 );
	camera.rotation.y = Math.PI / 4;
	camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );


    renderer.setSize( window.innerWidth, window.innerHeight );
    canvas.appendChild( renderer.domElement );

    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize(canvas.offsetWidth,canvas.offsetHeight);

    let camera_control = new THREE.OrbitControls( camera,renderer.domElement);
    scene.add(snake.body[0]);
    scene.add(apple.object);
    window.addCellsToScene(cell);
    let animate = function () {
        requestAnimationFrame(animate);
        snake.move();
        renderer.render( scene, camera );
    };
    animate();

/*Snake Listener*/
    let keyCode;
    document.addEventListener("keydown", (event)=>{
             keyCode = event.key;
             snake.changeDirection(keyCode);
           });


});


