let snake = null;
window.addEventListener('DOMContentLoaded', ()=>{

   /*Snake Object Logic*/
   class Snake{
      constructor() {
         this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00} );
         this.snakeHead = new THREE.Mesh( new THREE.BoxGeometry(), this.material );
         this.lenght = 1;
         this.speed = 0.05;
         this.direction = ['a','d','w','s','e','q']; //Necessary for AI
         this.currentDirection = [0,0,0];
         this.chosenDirection = [0,0,0];
         this.debug = true;
         this.translationError = 0.01;
         this.isValidTransition = [true,true,true];
         this.isValidEating = [false,false,false];
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
      }

      move(){
          this.checkSnakeState();
         this.isValidTransition = [
             Math.abs(this.snakeHead.position.x-Math.round(this.snakeHead.position.x)) < this.translationError,
             Math.abs(this.snakeHead.position.y-Math.round(this.snakeHead.position.y)) < this.translationError,
             Math.abs(this.snakeHead.position.z-Math.round(this.snakeHead.position.z)) < this.translationError
             ];
             if(this.isValidTransition[0] && this.isValidTransition[1] && this.isValidTransition[2]){
                 this.currentDirection = this.chosenDirection;
             }
              this.snakeHead.position.set(
                this.snakeHead.position.x + (this.currentDirection[0]*this.speed),
                this.snakeHead.position.y + (this.currentDirection[1]*this.speed),
                this.snakeHead.position.z + (this.currentDirection[2]*this.speed)
              );
      }

      checkSnakeState(){
          this.isValidEating = [
              Math.abs(this.snakeHead.position.x - apple.object.position.x ) < this.translationError,
              Math.abs(this.snakeHead.position.y - apple.object.position.y ) < this.translationError,
              Math.abs(this.snakeHead.position.z - apple.object.position.z ) < this.translationError
          ];

          if(this.isValidEating[0] && this.isValidEating[1] && this.isValidEating[2]) {
            snake.length += 1;
            apple.setNewPosition();
        }
      }


   }

   snake = new Snake();



});