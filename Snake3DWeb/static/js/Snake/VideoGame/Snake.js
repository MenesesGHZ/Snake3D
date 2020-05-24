let snake = null;
window.addEventListener('DOMContentLoaded', ()=>{

   /*Snake Object Logic*/
   class Snake{
      constructor(speed=1,user_mode=false) {
         this.speed = speed;
         this.directionController = {
             "USER":{"a":[1,0,0],"w":[0,1,0],"s":[0,-1,0],"d":[-1,0,0],"none":[0,0,1]},
             "FIRST_P":{"a":[1,0,0],"w":[0,1,0],"s":[0,-1,0],"d":[-1,0,0],"none":[0,0,1]}
         };
         this.oppositeKeyCode= {"a":"d","w":"s","s":"w","d":"a"};
         this.currentDirection = [[0,0,1]]; 
         this.chosenDirection = [0,0,1];
         this.volatileDirection = [0,0,0];
         this.translationError = 0.01
         this.isValidTransition = [true];
         this.isValidEating = false;
         this.body = [
             new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshBasicMaterial( { color: 0x00ff00} ) ),
            ];
         this.body[0].position.set(
             Math.round(Math.random()*(x-1)),
             Math.round(Math.random()*(y-1)),
             Math.round(Math.random()*(z-1))
         );
         this.gameOver = false;
         this.chosenSpeed = speed;         
         this.user_mode = user_mode;
         this.lastPosition = [-1,-1,-1];
         this.tempDir = [];
         this.lastKeyCode = "none";
        this.cameraTransitionConstant = Math.PI/32;
        this.cameraControllerSign = {
            "100": {"010":+1,"0-10":-1,"001":-1,"00-1":+1},
            "-100": {"010":-1,"0-10":+1,"001":+1,"00-1":-1},
            "010": {"100":-1,"-100":+1,"001":+1,"00-1":-1},
            "0-10": {"100":+1,"-100":-1,"001":-1,"00-1":+1},
            "001": {"100":+1,"-100":-1,"010":-1,"0-10":+1},
            "00-1": {"100":-1,"-100":+1,"010":+1,"0-10":-1}
            };
        this.cameraRotationVec = new THREE.Vector3(0,0,0);
        this.cameraChanging = false;
        this.cameraTransitionCounter = 0;
        this.cameraCurrentSign = 0;
      };

     oppositeController(keyCode_1,direction){
        if(keyCode_1 !== "none") {
            let oppositeKeyCode = this.oppositeKeyCode[keyCode_1];
            this.directionController["FIRST_P"][oppositeKeyCode] = direction;
            this.directionController["FIRST_P"][keyCode_1] = [
                direction[0] * -1,
                direction[1] * -1,
                direction[2] * -1
            ];
        }
     }
     
     changeSnakeCamera(){
            camera.rotateOnWorldAxis(this.cameraRotationVec,this.cameraCurrentSign*this.cameraTransitionConstant)   
            this.cameraTransitionConstant = Math.PI/32;
            this.cameraTransitionCounter += 1;       
            if( this.cameraTransitionCounter === 16 ){
                this.cameraRotationVec.set( false,false,false );
                this.cameraChanging = false;
                this.cameraTransitionCounter = 0;
            }  
        }
    
      move(){
             for(let i=0;i<this.body.length;i++){
                   this.isValidTransition[i] =  
                         Math.abs(this.body[i].position.x-Math.round(this.body[i].position.x)) < this.translationError &&
                         Math.abs(this.body[i].position.y-Math.round(this.body[i].position.y)) < this.translationError &&
                         Math.abs(this.body[i].position.z-Math.round(this.body[i].position.z)) < this.translationError;

                   if(this.isValidTransition[i]){
                       if(i!==0) { // if( it is not the head ) {follow the cube at front} .
                           this.volatileDirection = [
                               Math.round(this.body[i - 1].position.x - this.body[i].position.x),
                               Math.round(this.body[i - 1].position.y - this.body[i].position.y),
                               Math.round(this.body[i - 1].position.z - this.body[i].position.z)
                           ];
                           this.currentDirection[i] = this.volatileDirection;
                       }else{  
                           if (this.lastPosition[0] !== Math.round(this.body[0].position.x) ||
                               this.lastPosition[1] !== Math.round(this.body[0].position.y)  ||
                               this.lastPosition[2] !== Math.round(this.body[0].position.z)) {
                               this.lastPosition = [
                                        Math.round(this.body[0].position.x),
                                        Math.round(this.body[0].position.y),
                                        Math.round(this.body[0].position.z),
                                    ];
                                if(snake.user_mode){
                                    this.cameraChanging = 
                                        this.currentDirection[0][0] !== this.chosenDirection[0] ||
                                        this.currentDirection[0][1] !== this.chosenDirection[1] ||
                                        this.currentDirection[0][2] !== this.chosenDirection[2];
                                    if(this.cameraChanging){
                                        this.cameraRotationVec.set(
                                            this.currentDirection[0][0] === this.chosenDirection[0],
                                            this.currentDirection[0][1] === this.chosenDirection[1],
                                            this.currentDirection[0][2] === this.chosenDirection[2]
                                        );
                                        this.cameraCurrentSign = 
                                            this.cameraControllerSign["{0}{1}{2}".format(...this.currentDirection[0])]["{0}{1}{2}".format(...this.chosenDirection)]
                                        }
                                    }
                                    this.currentDirection[0] = this.chosenDirection;
                                    this.speed = this.chosenSpeed;
                                    this.directionController["FIRST_P"]["none"] = this.chosenDirection;
                                    this.oppositeController(this.lastKeyCode,this.tempDir);        
                                }   
                        }       
                    }      
            this.body[i].position.set(
                this.body[i].position.x + (this.currentDirection[i][0]*this.speed),
                this.body[i].position.y + (this.currentDirection[i][1]*this.speed),
                this.body[i].position.z + (this.currentDirection[i][2]*this.speed)
           );
        }
        if(snake.user_mode){
            camera.position.set(...Object.values(this.body[0].position));
            if(this.cameraChanging) this.changeSnakeCamera();
        }  
    }
  

    changeDirection(keyCode){
        this.tempDir = this.currentDirection[0];
        this.chosenDirection = this.directionController["FIRST_P"][keyCode];
        this.lastKeyCode = keyCode;  
        }

      run(){
       if(!this.gameOver){
         this.checkSnakeState();
         this.move();
       }
      }

      checkSnakeState(){
               this.isValidTransition[0] = 
                   Math.abs(this.body[0].position.x - Math.round(this.body[0].position.x)) < this.translationError &&
                   Math.abs(this.body[0].position.y - Math.round(this.body[0].position.y)) < this.translationError &&
                   Math.abs(this.body[0].position.z - Math.round(this.body[0].position.z)) < this.translationError &&
                   (this.lastPosition[0] !== Math.round(this.body[0].position.x) || 
                    this.lastPosition[1] !== Math.round(this.body[0].position.y) ||
                    this.lastPosition[2] !== Math.round(this.body[0].position.z));

               if (this.isValidTransition[0]) {
                   if(!this.user_mode) this.send_time_step_signal();
                   this.isValidEating =
                       Math.round(this.body[0].position.x) === apple.object.position.x &&
                       Math.round(this.body[0].position.y) === apple.object.position.y &&
                       Math.round(this.body[0].position.z) === apple.object.position.z;
                   if(this.isValidEating) {
                       this.addToSnake();
                       apple.setNewPosition();
                       right_bar_update(this.body.length);
                   }
                   this.gameOverLogic();

           }
      }

      addToSnake(){
          this.currentDirection.push([0,0,0]);
          this.body.push(new THREE.Mesh( new THREE.BoxGeometry(),  new THREE.MeshBasicMaterial( { color: 0x00DD00} )  ));
          this.body[this.body.length-1].position.set(
            Math.round(this.body[this.body.length-2].position.x - this.currentDirection[this.body.length-2][0]),
            Math.round(this.body[this.body.length-2].position.y - this.currentDirection[this.body.length-2][1]),
            Math.round(this.body[this.body.length-2].position.z - this.currentDirection[this.body.length-2][2])
          );
          scene.add(this.body[this.body.length-1]);
      }
      
      gameOverLogic(){
          if(!this.gameOver) {
              this.gameOver = this.didLose();
              if(this.gameOver){ 
                 restart_game();
              }
          }
      }

      didLose(){
          // it is set at 4 because at this point the snake is capable to collision itself.
          //check if the head is in any body part.
          for(let i=4;i<this.body.length;i++){
              if(Math.abs(this.body[0].position.x-this.body[i].position.x)<this.translationError &&
                 Math.abs(this.body[0].position.y-this.body[i].position.y)<this.translationError &&
                 Math.abs(this.body[0].position.z-this.body[i].position.z)<this.translationError){
                  return true;
              }
          }
          //check if the head is outside the Cell (Grid)
          if (this.body[0].position.x > x - 1 + this.translationError || this.body[0].position.x < -this.translationError ||
              this.body[0].position.y > y - 1 + this.translationError || this.body[0].position.y < -this.translationError ||
              this.body[0].position.z > z - 1 + this.translationError || this.body[0].position.z < -this.translationError) {
              return true;
          }

          return walls.didCollideWith([
              this.body[0].position.x,
              this.body[0].position.y,
              this.body[0].position.z
                        ],this.translationError);
      }

      takenLocations(){
          let takenPositions = [];
          for(let i=0;i<this.body.length;i++){
            takenPositions.push([
                    Math.round(this.body[i].position.x),
                    Math.round(this.body[i].position.y),
                    Math.round(this.body[i].position.z)
            ]);
          }
          return takenPositions;
      }

     clear(speed,user_mode){
          for (let i = 0; i < this.body.length; i++) {
            scene.remove(this.body[i]);
          }
         snake = new Snake(speed,user_mode);
         scene.add(snake.body[0]);
     }


    send_time_step_signal(){
        time_step_signal();
     }

   }
   snake = new Snake();
});

function restart_game(){
    if(!snake.user_mode) receive_update_signal();
    snake.clear(snake.chosenSpeed,snake.user_mode);
    if(snake.user_mode){
        camera.position.set(snake.body[0].position.x, snake.body[0].position.y, snake.body[0].position.z);
        camera.rotation.set(0,Math.PI,0);
    }
    walls.clear();
    apple.clear();
    delete_labeled_walls();
    right_bar_update();
    scene.add(apple.object);
}

function camera_rotation(){

}