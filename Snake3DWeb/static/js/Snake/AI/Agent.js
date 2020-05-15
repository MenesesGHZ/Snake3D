class SnakeAgent{
    constructor() {
        this.actions = ['a', 'w', 'd', 's', 'q', 'e'];
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
        let cells_next_to =[
            [pos_x+1,pos_y,pos_z],
            [pos_x-1,pos_y,pos_z],
            [pos_x,pos_y+1,pos_z],
            [pos_x,pos_y-1,pos_z],
            [pos_x,pos_y,pos_z+1],
            [pos_x,pos_y,pos_z-1]
        ], cells_next_to_state = ["b","b","b","b","b","b"];

        if(pos_x+1>x-1)
            cells_next_to_state[0]="d";
        if(pos_x-1<0)
            cells_next_to_state[1]="d";
        if(pos_y+1>y-1)
            cells_next_to_state[2]="d";
        if(pos_y-1<0)
            cells_next_to_state[3]="d";
        if(pos_z+1>z-1)
            cells_next_to_state[4]="d";
        if(pos_z-1<0)
            cells_next_to_state[5]="d";

        for(let i=0;i<env_elements["dangerPos"].length;i++){
            for(let j=0;j<env_elements["dangerPos"].length;j++){
                 if (env_elements["dangerPos"][i][0] === cells_next_to[j][0] &&
                     env_elements["dangerPos"][i][1] === cells_next_to[j][1] &&
                     env_elements["dangerPos"][i][2] === cells_next_to[j][2]){
                       cells_next_to_state[j] = "d";
                   }
             }
        }
        return "{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}{11}".format(
            Math.sign(apple.object.position.x - pos_x),
            Math.sign(apple.object.position.y - pos_y),
            Math.sign(apple.object.position.z - pos_z),
            cells_next_to_state[0],
            cells_next_to_state[1],
            cells_next_to_state[2],
            cells_next_to_state[3],
            cells_next_to_state[4],
            cells_next_to_state[5],
            snake.currentDirection[0][0],
            snake.currentDirection[0][1],
            snake.currentDirection[0][2]
        );
    }

    do(action){
      snake.changeDirection(action);
    }

}



