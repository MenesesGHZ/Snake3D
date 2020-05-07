let scene = null,
    window_relation = window.innerWidth / window.innerHeight;


window.addEventListener('load',()=>{
    //let rx = document.getElementById('rx');
    scene = new THREE.Scene();
    let renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true }),
        canvas = document.getElementById('canvas'),
        frame_relation = canvas.offsetWidth/canvas.offsetHeight,
        camera = new THREE.PerspectiveCamera( 75, frame_relation, 0.1, 1000 );
    /*
    let camera_direction = [0,0,0],
        cameraValidDirection = [false,false,false],
        radiansDirection = [0,0,0];
     */
    //Isometric View
    camera.position.set( 3.7, 3.7, 3.7 );
	camera.rotation.y = Math.PI / 4;
	camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );

    canvas.appendChild( renderer.domElement );
    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize(canvas.offsetWidth,canvas.offsetHeight);

    let camera_control = new THREE.OrbitControls( camera,renderer.domElement);
    camera_control.autoRotate = true;
    scene.add(snake.body[0]);
    scene.add(apple.object);
    window.addMatrix3DToElement(cell,scene);

    scene.position.set(-(x-1)/2,-(y-1)/2,-(z-1)/2);

    var axesHelper = new THREE.AxesHelper( 5 );
    axesHelper.size = 10;
    scene.add( axesHelper );


    let animate = function () {
        requestAnimationFrame(animate);
        snake.move();
        camera_control.update();
        renderer.render( scene, camera );
    };
    animate();
    /*Snake Listener*/
    let keyCode;

    document.addEventListener("keydown", (event)=>{
         keyCode = event.key;
         snake.changeDirection(keyCode);
       });
    document.getElementById('auto-rotation').addEventListener("change", element =>{
        camera_control.autoRotate = element.target.checked;
    });

});

