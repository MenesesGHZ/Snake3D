let snake = null;
window.addEventListener('DOMContentLoaded', ()=>{

   /*Snake Object Logic*/
   class Snake{
      constructor(speed=1,user_mode=true) {
         this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00} );
         this.length = 1;
         this.speed = speed;
         this.directionController = {
             "USER":{'a':[1,0,0],'d':[-1,0,0],'w':[0,0,1],'s':[0,0,-1],'e':[0,1,0],'q':[0,-1,0]},
             "AI":{"a":[1,0,0],"w":[0,1,0],"s":[0,-1,0],"d":[-1,0,0],"none":[0,0,1]}
         };
         this.oppositeKeyCode= {"a":"d","w":"s","s":"w","d":"a"};
         this.currentDirection = [[0,0,1]];
         this.chosenDirection = [0,0,1];
         this.volatileDirection = [0,0,0];
         this.translationError = 0.01
         this.isValidTransition = [true];
         this.isValidEating = false;
         this.body = [
             new THREE.Mesh( new THREE.BoxGeometry(), this.material ),
            ];
         this.body[0].position.set(
             Math.round(Math.random()*(x-1)),
             Math.round(Math.random()*(y-1)),
             Math.round(Math.random()*(z-1))
         );
         this.gameOver = false;
         this.chosenSpeed = speed;
         this.user_mode = user_mode;
         this.lastPosition = [-1,-1,-1]; // Send Clean Signal to the AI
         this.tempDir = [];
         this.lastKeyCode = "none";
      }

     oppositeController(keyCode_1,direction){
        if(keyCode_1 !== "none") {
            let oppositeKeyCode = this.oppositeKeyCode[keyCode_1];
            this.directionController["AI"][oppositeKeyCode] = direction;
            this.directionController["AI"][keyCode_1] = [
                direction[0] * -1,
                direction[1] * -1,
                direction[2] * -1
            ];
        }
     }
     changeDirection(keyCode){
          if(!this.user_mode) {
              this.tempDir = this.currentDirection[0];
              this.chosenDirection = this.directionController["AI"][keyCode];
              this.lastKeyCode = keyCode;
          }else{
            if(Object.keys(this.directionController["USER"]).includes(keyCode)){
                    this.chosenDirection = this.directionController["USER"][keyCode];
            }
            if(this.chosenDirection[0]*-1 === this.currentDirection[0][0] &&
               this.chosenDirection[1]*-1 === this.currentDirection[0][1] &&
               this.chosenDirection[2]*-1 === this.currentDirection[0][2]){
              this.chosenDirection = this.currentDirection[0];
            }
          }
      }
      move(){
             for(let i=0;i<this.length;i++){
                   this.isValidTransition[i] =  //Check if the current position is valid to change direction
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
                            this.speed = this.chosenSpeed;
                            this.currentDirection[0] = this.chosenDirection;
                            this.directionController["AI"]["none"] = this.chosenDirection;
                            this.oppositeController(this.lastKeyCode,this.tempDir);
                       }
                   }
                   this.body[i].position.set(
                         this.body[i].position.x + (this.currentDirection[i][0]*this.speed),
                         this.body[i].position.y + (this.currentDirection[i][1]*this.speed),
                         this.body[i].position.z + (this.currentDirection[i][2]*this.speed)
                    );
            }
             /*
             if(this.user_mode){
                       camera.position.x += this.currentDirection[0][0] * this.speed;
                       camera.position.y += this.currentDirection[0][1] * this.speed;
                       camera.position.z += this.currentDirection[0][2] * this.speed;
                    }
              */
      }

      run(){
       if(!this.gameOver){
         this.checkSnakeState();
         this.move();
       }
      }

      checkSnakeState(){
               this.isValidTransition[0] =  //Check if the current position is valid to change direction
                   Math.abs(this.body[0].position.x - Math.round(this.body[0].position.x)) < this.translationError &&
                   Math.abs(this.body[0].position.y - Math.round(this.body[0].position.y)) < this.translationError &&
                   Math.abs(this.body[0].position.z - Math.round(this.body[0].position.z)) < this.translationError;
               if (this.isValidTransition[0]) {
                   
                   if(!this.user_mode) this.send_time_step_signal();

                   this.isValidEating =
                       Math.round(this.body[0].position.x) === apple.object.position.x &&
                       Math.round(this.body[0].position.y) === apple.object.position.y &&
                       Math.round(this.body[0].position.z) === apple.object.position.z;
                   if(this.isValidEating) {
                       this.addToSnake();
                       apple.setNewPosition();
                       right_bar_update(this.length);
                   }
                   this.gameOverLogic();

           }
      }
      addToSnake(){
          this.currentDirection.push([0,0,0]);
          this.body.push(new THREE.Mesh( new THREE.BoxGeometry(), this.material ));
          this.body[this.length].position.set(
            Math.round(this.body[this.length-1].position.x - this.currentDirection[this.length-1][0]),
            Math.round(this.body[this.length-1].position.y - this.currentDirection[this.length-1][1]),
            Math.round(this.body[this.length-1].position.z - this.currentDirection[this.length-1][2])
          );
          scene.add(this.body[this.length]);
          this.length += 1;
      }
      
      gameOverLogic(){
          if(!this.gameOver) {
              this.gameOver = this.didLose();
              if(this.gameOver){ // this only run once to display the 'game over' text.
                 /*
                  let loader = new THREE.FontLoader();
                  loader.load(static_path + 'helvetiker_regular.typeface.json', function (font) {
                      let text_geometry = new THREE.TextGeometry('Game Over', {
                          font: font,
                          size: 0.8,
                          height: 0.2,
                          curveSegments: 6
                      });
                      let text_material = new THREE.MeshPhongMaterial({color: 0xFF0000}),
                          text_mesh = new THREE.Mesh(text_geometry, text_material);
                      scene.add(text_mesh);
                  });

                  */
                 restart_game();
              }
          }
      }

      didLose(){
          // it is set at 4 because at this point the snake is capable to collision itself.
          //check if the head is in any body part.
          for(let i=4;i<this.length;i++){
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
          for(let i=0;i<this.length;i++){
            takenPositions.push([
                    Math.round(this.body[i].position.x),
                    Math.round(this.body[i].position.y),
                    Math.round(this.body[i].position.z)
            ]);
          }
          return takenPositions;
      }

     clear(){
          for (let i = 0; i < this.length; i++) {
            scene.remove(this.body[i]);
          }
         snake = new Snake(snake.chosenSpeed,snake.user_mode);
     }
     send_time_step_signal(){
            receive_time_step_signal();
     }

   }
   snake = new Snake();
});

function restart_game(){
    snake.clear();
    walls.clear();
    apple.clear();
    if(!snake.user_mode) receive_update_signal();
    scene.add(snake.body[0]);
    scene.add(apple.object);
    right_bar_update();
}