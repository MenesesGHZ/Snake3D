let snake = null;
window.addEventListener('DOMContentLoaded', ()=>{

   /*Snake Object Logic*/
   class Snake{
      constructor() {
         this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00} );
         this.length = 1;
         this.speed = 0.05;
         this.direction = ['a','d','w','s','e','q']; //Necessary for AI
         this.currentDirection = [[0,0,0]];
         this.chosenDirection = [0,0,0];
         this.volatileDirection = [0,0,0];
         this.translationError = 0.01;
         this.isValidTransition = [[true,true,true]];
         this.isValidEating = [false,false,false];
         this.body = [
             new THREE.Mesh( new THREE.BoxGeometry(), this.material ),
            ];
         this.bodyIndex = 0;
         this.gameOver = false;
         this.user_mode = true;
      }

     changeDirection(keyCode){
          if (keyCode === 'a')  //left
               this.chosenDirection = [1,0,0];
          else if (keyCode === 'd')  //right
               this.chosenDirection = [-1,0,0];
          else if(keyCode === 'w') //forward
               this.chosenDirection = [0,0,1];
          else if(keyCode === 's') //back
             this.chosenDirection = [0,0,-1];
          else if (keyCode === 'e') // up
               this.chosenDirection = [0,1,0];
          else if (keyCode === 'q') //down
               this.chosenDirection = [0,-1,0];
          if(this.chosenDirection[0]*-1 === this.currentDirection[0][0] && // If is the opposite Direction, the snake direction does not change.
             this.chosenDirection[1]*-1 === this.currentDirection[0][1] &&
             this.chosenDirection[2]*-1 === this.currentDirection[0][2]){
              this.chosenDirection = this.currentDirection[0];
          }


      }
      move(){
             for(;this.bodyIndex<this.length;this.bodyIndex++){
                   this.isValidTransition[this.bodyIndex] = [  //Check if the current position is valid to change direction
                         Math.abs(this.body[this.bodyIndex].position.x-Math.round(this.body[this.bodyIndex].position.x)) < this.translationError,
                         Math.abs(this.body[this.bodyIndex].position.y-Math.round(this.body[this.bodyIndex].position.y)) < this.translationError,
                         Math.abs(this.body[this.bodyIndex].position.z-Math.round(this.body[this.bodyIndex].position.z)) < this.translationError
                   ];
                   if(this.isValidTransition[this.bodyIndex][0] && this.isValidTransition[this.bodyIndex][1] && this.isValidTransition[this.bodyIndex][2]){
                       if(this.bodyIndex!==0) { // if( it is not the head ) {follow the cube at front} .
                           this.volatileDirection = [ //Only one unit of distance per cube exist. Therefore I am comparing the [front_cube.position - behind_cube.position] to get behind_cube's direction.
                               Math.round(this.body[this.bodyIndex - 1].position.x - this.body[this.bodyIndex].position.x),
                               Math.round(this.body[this.bodyIndex - 1].position.y - this.body[this.bodyIndex].position.y),
                               Math.round(this.body[this.bodyIndex - 1].position.z - this.body[this.bodyIndex].position.z)
                           ];
                           this.currentDirection[this.bodyIndex] = this.volatileDirection;
                       }else{
                            this.currentDirection[0] = this.chosenDirection;
                       }
                   }
                   this.body[this.bodyIndex].position.set(
                        this.body[this.bodyIndex].position.x +  (this.currentDirection[this.bodyIndex][0]*this.speed),
                         this.body[this.bodyIndex].position.y + (this.currentDirection[this.bodyIndex][1]*this.speed),
                         this.body[this.bodyIndex].position.z + (this.currentDirection[this.bodyIndex][2]*this.speed)
                    );
            }
             if(this.user_mode === true){
                       camera.position.x += this.currentDirection[0][0] * this.speed;
                       camera.position.y += this.currentDirection[0][1] * this.speed;
                       camera.position.z += this.currentDirection[0][2] * this.speed;
                    }
             this.bodyIndex = 0;
             this.checkSnakeState();
      }
      checkSnakeState(){
          this.isValidEating = [
              Math.abs(this.body[0].position.x - apple.object.position.x ) < this.translationError,
              Math.abs(this.body[0].position.y - apple.object.position.y ) < this.translationError,
              Math.abs(this.body[0].position.z - apple.object.position.z ) < this.translationError
          ];
          this.gameOverLogic();
          if(this.isValidEating[0] && this.isValidEating[1] && this.isValidEating[2]) {
            this.addToSnake();
            apple.setNewPosition();
        }
      }
      addToSnake(){
          this.currentDirection.push([0,0,0]);
          this.body.push(new THREE.Mesh( new THREE.BoxGeometry(), this.material ));
          this.body[this.length].position.set(
            Math.round(this.body[this.length-1].position.x),
            Math.round(this.body[this.length-1].position.y),
            Math.round(this.body[this.length-1].position.z)
          );
          scene.add(this.body[this.length]);
          this.length += 1;
      }

      gameOverLogic(){

          if(!this.gameOver) {
              this.gameOver = this.didLose();
              if(this.gameOver){ // this only run once to display the 'game over' text.
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
              }
          }

      }

      didLose(){
          this.bodyIndex = 0
              this.bodyIndex = 4 // it is set at 4 because at this point the snake is capable to collision itself.
              //check if the head is in any body part.
              for(;this.bodyIndex<this.length;this.bodyIndex++){
                  if(Math.abs(this.body[0].position.x-this.body[this.bodyIndex].position.x)<this.translationError &&
                     Math.abs(this.body[0].position.y-this.body[this.bodyIndex].position.y)<this.translationError &&
                     Math.abs(this.body[0].position.z-this.body[this.bodyIndex].position.z)<this.translationError){
                      return true;
                  }
              }
              this.bodyIndex = 0;
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
          for(;this.bodyIndex<this.length;this.bodyIndex++){
            takenPositions.push([
                    Math.round(this.body[this.bodyIndex].position.x),
                    Math.round(this.body[this.bodyIndex].position.y),
                    Math.round(this.body[this.bodyIndex].position.z)
            ]);
          }
          return takenPositions;
      }

     clear(){
          for (let i = 0; i < this.length; i++) {
            scene.remove(this.body[i]);
          }
         snake = new Snake();
         scene.add(snake.body[0]);
     }

   }

   snake = new Snake();

});