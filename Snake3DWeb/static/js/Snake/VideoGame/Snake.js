let snake = null;
window.addEventListener('DOMContentLoaded', ()=>{

   /*Snake Object Logic*/
   class Snake{
      constructor() {
         this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00} );
         this.snakeHead = new THREE.Mesh( new THREE.BoxGeometry(), this.material );
         this.lenght = 1;
         this.speed = 0.05;
         this.direction = ['a','d','w','s','x','z']; //Necessary for AI
         this.currentDirection = [0,0,0];
         this.chosenDirection = [0,0,0];
         this.currentPosition = [0,0,0];
         this.debug = true;
         this.translationError = 0.01;
         this.isValidTransition = [true,true,true]
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
          else if (keyCode === 'x') // up
               this.chosenDirection = [0,1,0];
          else if (keyCode === 'z') //down
               this.chosenDirection = [0,-1,0];
      }






      move(){
         this.isValidTransition = [
             Math.abs(this.currentPosition[0]-Math.round(this.currentPosition[0])) < this.translationError,
             Math.abs(this.currentPosition[1]-Math.round(this.currentPosition[1])) < this.translationError,
             Math.abs(this.currentPosition[2]-Math.round(this.currentPosition[2])) < this.translationError
             ];
             if(this.isValidTransition[0] && this.isValidTransition[1] && this.isValidTransition[2]){
                 this.currentDirection = this.chosenDirection;
             }
              this.currentPosition = [
                this.currentPosition[0] + (this.currentDirection[0]*this.speed),
                this.currentPosition[1] + (this.currentDirection[1]*this.speed),
                this.currentPosition[2] + (this.currentDirection[2]*this.speed)
            ];

        this.snakeHead.position.set(this.currentPosition[0],
                                         this.currentPosition[1],
                                         this.currentPosition[2]);

      }
   }

   snake = new Snake();



});