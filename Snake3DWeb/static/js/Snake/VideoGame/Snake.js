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
         this.bodyIndex = 1;
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
            this.isValidTransition[0] = [
             Math.abs(this.body[0].position.x-Math.round(this.body[0].position.x)) < this.translationError,
             Math.abs(this.body[0].position.y-Math.round(this.body[0].position.y)) < this.translationError,
             Math.abs(this.body[0].position.z-Math.round(this.body[0].position.z)) < this.translationError
             ];
             if(this.isValidTransition[0][0] && this.isValidTransition[0][1] && this.isValidTransition[0][2]){
                 this.currentDirection[0] = this.chosenDirection;
             }
                this.body[0].position.set(
                     this.body[0].position.x + (this.currentDirection[0][0]*this.speed),
                     this.body[0].position.y + (this.currentDirection[0][1]*this.speed),
                     this.body[0].position.z + (this.currentDirection[0][2]*this.speed)
                 );

                 for(;this.bodyIndex<this.length;this.bodyIndex++){

                      this.volatileDirection = [
                          Math.round(this.body[this.bodyIndex-1].position.x-this.body[this.bodyIndex].position.x),
                          Math.round(this.body[this.bodyIndex-1].position.y-this.body[this.bodyIndex].position.y),
                          Math.round(this.body[this.bodyIndex-1].position.z-this.body[this.bodyIndex].position.z)
                      ];
                       this.isValidTransition[this.bodyIndex] = [
                             Math.abs(this.body[this.bodyIndex].position.x-Math.round(this.body[this.bodyIndex].position.x)) < this.translationError,
                             Math.abs(this.body[this.bodyIndex].position.y-Math.round(this.body[this.bodyIndex].position.y)) < this.translationError,
                             Math.abs(this.body[this.bodyIndex].position.z-Math.round(this.body[this.bodyIndex].position.z)) < this.translationError
                       ];

                       if(this.isValidTransition[this.bodyIndex][0] && this.isValidTransition[this.bodyIndex][1] && this.isValidTransition[this.bodyIndex][2]){
                            this.currentDirection[this.bodyIndex] = this.volatileDirection;
                           }

                       this.body[this.bodyIndex].position.set(
                            this.body[this.bodyIndex].position.x + (this.currentDirection[this.bodyIndex][0]*this.speed),
                             this.body[this.bodyIndex].position.y + (this.currentDirection[this.bodyIndex][1]*this.speed),
                             this.body[this.bodyIndex].position.z + (this.currentDirection[this.bodyIndex][2]*this.speed)
                        );
                }
             this.bodyIndex = 1;
      }
      checkSnakeState(){
          this.isValidEating = [
              Math.abs(this.body[0].position.x - apple.object.position.x ) < this.translationError,
              Math.abs(this.body[0].position.y - apple.object.position.y ) < this.translationError,
              Math.abs(this.body[0].position.z - apple.object.position.z ) < this.translationError
          ];

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
   }
   snake = new Snake();
});