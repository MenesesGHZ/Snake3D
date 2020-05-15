class SnakeEnvironment{
    constructor(grid_size=[4,4,4]) {
        `
        this.rewards: Blank = -1, Danger = -2, Apple = +1
        `
        this.time_step = 0;
        this.markov_trajectory = [];
        this.rewards = {"b":-0.25,"d":-2,"a":+1};
    }

    read_environment(){
        `  
            Read Apple Position in the Grid: 
            Read Danger Positions in the Grid:
                Walls, Body Parts (snake tail)
            Read Current Cell of Snake:
                Blank, Danger, Apple
        `
        let env_sensor = {"currentCell":"b","applePos":[],"dangerPos":[]},
            pos_x,pos_y,pos_z;

        for(let i=0; i<walls.length;i++){
            pos_x = Math.round(walls[i].object.position.x);
            pos_y = Math.round(walls[i].object.position.y);
            pos_z = Math.round(walls[i].object.position.z);
            env_sensor["dangerPos"].push([pos_x,pos_y,pos_z])
            if(Math.round(snake.body[0].position.x) === pos_x &&
               Math.round(snake.body[0].position.y) === pos_y &&
               Math.round(snake.body[0].position.z) === pos_z){
                env_sensor["currentCell"] = "d";
            }
        }
        for(let i=4;i<snake.length;i++){
            pos_x = Math.round(snake.body[i].position.x);
            pos_y = Math.round(snake.body[i].position.y);
            pos_z = Math.round(snake.body[i].position.z);
            env_sensor["dangerPos"].push([pos_x,pos_y,pos_z]);
            if(Math.round(snake.body[0].position.x) === pos_x &&
               Math.round(snake.body[0].position.y) === pos_y &&
               Math.round(snake.body[0].position.z) === pos_z){
                env_sensor["currentCell"] = "d";
            }
        }
        env_sensor["applePos"].push(
            [apple.object.position.x,
             apple.object.position.y,
             apple.object.position.z]
        );
        if(Math.round(snake.body[0].position.x) > x-1 || Math.round(snake.body[0].position.x) < 0 ||
           Math.round(snake.body[0].position.y) > y-1 || Math.round(snake.body[0].position.y) < 0 ||
           Math.round(snake.body[0].position.z) > z-1 || Math.round(snake.body[0].position.z) < 0){
            env_sensor["currentCell"] = "d";
        } else if(Math.round(snake.body[0].position.x) === apple.object.position.x &&
                   Math.round(snake.body[0].position.y) === apple.object.position.y &&
                   Math.round(snake.body[0].position.z) === apple.object.position.z){
                        env_sensor["currentCell"] = "a";
                    }
        return env_sensor;
    }


    compute_positions(grid_size,outside_positions=true){
        let output = [],
            offset = 1*outside_positions;
        for(let i=0-offset;i<grid_size[0]+offset;i++)
            for(let j=-offset;j<grid_size[1]+offset;j++)
                for(let k=-offset;k<grid_size[2]+offset;k++)
                    output.push([i,j,k]);
        return output;
    }


    compute_states(dataArray_1,dataArray_2,dataArray_3){
        let output = [];
        for(let i=0;i<dataArray_1.length;i++)
            for(let j=0;j<dataArray_2.length;j++)
                for(let k=0;k<dataArray_3.length;k++)
                    output.push([dataArray_1[i],dataArray_2[j],dataArray_3[k]]);
        return output;
    }

    compute_posible_distances(grid_size) {
        let output = [],
            all_positions = this.compute_positions(grid_size),
            distance;
        for(let i=0; i<all_positions.length;i++ ) {
            distance = Math.sqrt(
                Math.pow(all_positions[i][0], 2) +
                Math.pow(all_positions[i][1], 2) +
                Math.pow(all_positions[i][2], 2)
            );
            if (!output.includes(distance)) {
                output.push(distance)
            }
        }
        return output;
    }
}


