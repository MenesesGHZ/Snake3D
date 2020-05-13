class SnakeEnvironment{
    constructor(grid_size=[4,4,4]) {

        this.time_step = 0;
        this.rewards = {"blank":-1,"danger":-2,"apple":+1};
    }


    read_environment(){
        `  
            Read Apple Position in the Grid: 
            Read Danger Positions in the Grid:
                Walls, Body Parts (snake tail)
        `
        let env_sensor = {"ApplePos":[],"DangerPos":[]},
            x,y,z;
        for(let i=0; i<walls.length;i++){
            x = Math.round(walls[i].object.position.x);
            y = Math.round(walls[i].object.position.y);
            z = Math.round(walls[i].object.position.z);
            env_sensor["DangerPos"].push([x,y,z])
        }
        for(let i=1;i<snake.length;i++){
            x = Math.round(snake.body[i].position.x);
            y = Math.round(snake.body[i].position.y);
            z = Math.round(snake.body[i].position.z);
            env_sensor["DangerPos"].push([x,y,z]);
        }
        env_sensor["ApplePos"].push(
            [apple.object.position.x,
             apple.object.position.y,
             apple.object.position.z]
        );
        return env_sensor;
    }

    end_episode(){
       /*When Snake AI has Loose*/
    }

    reward_t_a(time_step,action){

    }

    discounted_return(){

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


