class SnakeAgent{
    constructor() {
        this.actions = ['a', 'w', 's', 'd', 'none'];
        this.currentCell = "b";
    }

    read_state(env_elements){
        `
            This function has the main purpose 
            to return the direction of the snake to the apple as a target.
            Also sense the cells next to the snake.
            [
            x_direction_to_apple,
            y_direction_to_apple,
            z_direction_to_apple,
            positive_x_cell_type,
            negative_x_cell_type,
            positive_y_cell_type,
            negative_y_cell_type,
            positive_z_cell_type,
            negative_z_cell_type,
            ]
        `
        this.currentCell = env_elements["currentCell"];
        if(this.currentCell === 'd'){
            return "loosing_state";
        }
        let pos_x = Math.round(snake.body[0].position.x),
            pos_y = Math.round(snake.body[0].position.y),
            pos_z = Math.round(snake.body[0].position.z);
        let cell_if_action = {"a":"b","w":"b","s":"b","d":"b","none":"b"},
            direction;

        for(let i=0;i<this.actions.length;i++){
            direction = snake.directionController["USER"][this.actions[i]]
            if(direction[0]!==0){
                  if(pos_x+direction[0]>x-1 ||
                    pos_x+direction[0]<0){
                    cell_if_action[this.actions[i]] = "d";
                }
            }else if(direction[1]!==0){
                      if(pos_y+direction[1]>y-1 ||
                        pos_y+direction[1]<0){
                        cell_if_action[this.actions[i]] = "d";
                    }
              }
            else{
              if(pos_z+direction[2]>z-1 ||
                    pos_z+direction[2]<0){
                    cell_if_action[this.actions[i]] = "d";
                }
            }
        }
/*
            for(let j=0;env_elements["dangerPos"].length;j++) {
                for(let i=0; i<cell_if_action.length-1;i++){
                    if (pos_x + possible_directions[i][0] === env_elements["dangerPos"][j][0] &&
                        pos_y + possible_directions[i][1] === env_elements["dangerPos"][j][1] &&
                        pos_z + possible_directions[i][2] === env_elements["dangerPos"][j][2]) {
                        cell_if_action[j] = "d";
                    }
                }
            }

 */
/*
        for(let i=0; i<possible_directions.length;i++){
            if(env_elements["applePos"][0]===possible_directions[i][0] &&
               env_elements["applePos"][1]===possible_directions[i][1] &&
               env_elements["applePos"][2]===possible_directions[i][2] ){
                 cell_if_action[j] = "a";
            }
        }

 */
        return "{0}{1}{2}{3}{4}{5}{6}{7}".format(
            Math.sign(apple.object.position.x - pos_x),
            Math.sign(apple.object.position.y - pos_y),
            Math.sign(apple.object.position.z - pos_z),
            cell_if_action["a"],
            cell_if_action["w"],
            cell_if_action["s"],
            cell_if_action["d"],
            cell_if_action["none"]
        );
    }

    do(action){
      snake.changeDirection(action);
    }

}



