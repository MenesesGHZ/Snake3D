let scene = null,
    camera = null,
    play = false,
    window_relation = window.innerWidth / window.innerHeight;



window.addEventListener('load',()=>{
    //let rx = document.getElementById('rx');
    scene = new THREE.Scene();
    let renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true }),
        canvas = document.getElementById('canvas'),
        frame_relation = canvas.offsetWidth/canvas.offsetHeight;
    camera = new THREE.PerspectiveCamera( 75, frame_relation, 0.1, 1000 );

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
        if(play) snake.run();
        if(!snake.user_mode) camera_control.update();
        renderer.render( scene, camera );
    };
    read_learning();
    animate();



document.getElementById('feature-player-mode').addEventListener('click',()=>{
    snake.clear(0.01,true);

   

    scene.position.set(0,0,0); 
    
    camera.position.set(
        snake.body[0].position.x,
        snake.body[0].position.y,
        snake.body[0].position.z
        );
    camera.lookAt(
        snake.body[0].position.x + 2*snake.currentDirection[0][0],
        snake.body[0].position.y + 2*snake.currentDirection[0][1],
        snake.body[0].position.z + 2*snake.currentDirection[0][2]
    );

    camera_control.enabled = false;
    camera_control.autoRotate = false;
    document.getElementById('control-orbit-controls-input').checked = false;
    document.getElementById('control-auto-rotation-input').checked = false;
    play = true;
});

document.getElementById('trigger-AI').addEventListener('click',()=>{
    if(snake.user_mode) {
        scene.position.set(-(x-1)/2,-(y-1)/2,-(z-1)/2);
        snake.user_mode = false;
        camera.position.set(3.7, 3.7, 3.7);
        camera_control = new THREE.OrbitControls(camera, renderer.domElement);
        camera_control.enabled = true;
        camera_control.autoRotate = true;
        document.getElementById('control-orbit-controls-input').checked = true;
        document.getElementById('control-auto-rotation-input').checked = true;
    }else{
        //Download policy FILE
    }
    play = true;
});




/*Snake Control's Listeners*/

 let keyCode;
  document.addEventListener("keydown", (event)=>{
         keyCode = event.key;
         if(Object.keys(snake.directionController["USER"]).includes(keyCode)){
              snake.changeDirection(keyCode);
         }
       });
       
    document.getElementById('control-auto-rotation').addEventListener("change", element =>{
        camera_control.autoRotate = element.target.checked;
    });
    document.getElementById('control-orbit-controls').addEventListener("change",element=>{
        camera_control.enabled = element.target.checked;
    });
});




