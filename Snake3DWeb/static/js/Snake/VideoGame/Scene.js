let scene = null,
    window_relation = window.innerWidth / window.innerHeight;


window.addEventListener('load',()=>{
    //let rx = document.getElementById('rx');
    scene = new THREE.Scene();
    let renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true }),
        canvas = document.getElementById('canvas'),
        camera = new THREE.PerspectiveCamera( 75, window_relation, 0.1, 1000 );
    let camera_direction = [0,0,0],
        cameraValidDirection = [false,false,false],
        radiansDirection = [0,0,0];
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

    var axesHelper = new THREE.AxesHelper( 5 );
    axesHelper.size = 10;
scene.add( axesHelper );

    let animate = function () {
        requestAnimationFrame(animate);
        /*
        cameraValidDirection = [
            snake.currentDirection[0]!==camera_direction[0],
            snake.currentDirection[1]!==camera_direction[1],
            snake.currentDirection[2]!==camera_direction[2],
                ];
        if(cameraValidDirection[0] || cameraValidDirection[1] || cameraValidDirection[2]){
            radiansDirection = [
                ((1+snake.currentDirection[0][0])/2)*Math.PI,
                ((1+snake.currentDirection[0][1])/2)*Math.PI,
                ((1+snake.currentDirection[0][2])/2)*Math.PI,
            ]
            camera.rotation.x += radiansDirection[0];
            camera.rotation.y += radiansDirection[1];
            camera.rotation.z += radiansDirection[2];
            console.log(snake.currentDirection[0])
            camera_direction = snake.currentDirection.slice();
        }
        camera.position.set(snake.body[0].position.x,
            snake.body[0].position.y,
            snake.body[0].position.z);
            */

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

