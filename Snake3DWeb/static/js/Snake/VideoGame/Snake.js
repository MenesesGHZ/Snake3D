let snake = null;
window.addEventListener('DOMContentLoaded', ()=>{

   /*Snake Object Logic*/
   class Snake{
      constructor() {
         this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00} );
         this.snakeHead = new THREE.Mesh( new THREE.BoxGeometry(), this.material );
         this.lenght = 1;
         this.speed = 0.05;
         this.direction = ['a','d','ArrowUp','ArrowDown','w']; //Necessary for AI
         this.currentDirection = [0,0,0];
         this.currentPosition = [0,0,0];
         this.debug = true;
      }
      changeDirection(keyCode){
          if (keyCode === 'a') { //right
               this.currentDirection = [1,0,0];
               console.log('right')
          }
          else if (keyCode === 'd')  //left
               this.currentDirection = [-1,0,0];
          else if(keyCode === 'ArrowUp'){ //up
               this.currentDirection = [0,0,1]
          }
          else if(keyCode === 'ArrowDown'){ //down
             this.currentDirection = [0,0,-1]
          }
          else if (keyCode === 'w') { // forward
               this.currentDirection = [0,1,0]
          }
      }
      move(){

        this.currentPosition = [
            this.currentPosition[0] + this.currentDirection[0]*this.speed,
            this.currentPosition[1] + this.currentDirection[1]*this.speed,
            this.currentPosition[2] + this.currentDirection[2]*this.speed
        ];
         this.snakeHead.position.set(this.currentPosition[0],
                                     this.currentPosition[1],
                                     this.currentPosition[2]);

      }
   }

   snake = new Snake();



});