class SnakeAgent{
    constructor() {
        this.actions = ['a', 'w', 'd', 's', 'q', 'e'];
        this.currentCell = "blank";
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
        ], cells_next_to_state = ["blank","blank","blank","blank","blank","blank"];

        if(pos_x+1>x-1)
            cells_next_to_state[0]="danger"
        if(pos_x-1<0)
            cells_next_to_state[1]="danger"
        if(pos_y+1>y-1)
            cells_next_to_state[2]="danger"
        if(pos_y-1<0)
            cells_next_to_state[3]="danger"
        if(pos_z+1>z-1)
            cells_next_to_state[4]="danger"
        if(pos_z-1<0)
            cells_next_to_state[5]="danger"

        for(let i=0;i<env_elements["DangerPos"].length;i++){
            for(let j=0;j<env_elements["DangerPos"].length;j++){
                 if (env_elements["DangerPos"][i][0] === cells_next_to[j][0] &&
                     env_elements["DangerPos"][i][1] === cells_next_to[j][1] &&
                     env_elements["DangerPos"][i][2] === cells_next_to[j][2]){
                       cells_next_to_state[j] = "danger";
                   }
             }
        }

        return [
            Math.sign(apple.object.position.x - pos_x),
            Math.sign(apple.object.position.y - pos_y),
            Math.sign(apple.object.position.z - pos_z),
            cells_next_to_state[0],
            cells_next_to_state[1],
            cells_next_to_state[2],
            cells_next_to_state[3],
            cells_next_to_state[4],
            cells_next_to_state[5],
        ];
    }

    do(action){
      snake.changeDirection(action);
    }

}



