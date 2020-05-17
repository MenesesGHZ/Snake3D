class SnakeEnvironment{
    constructor(grid_size=[4,4,4]) {
        `
        this.rewards: Blank = -1, Danger = -2, Apple = +1
        `
        this.time_step = 0;
        this.markov_trajectory = [];
        this.rewards = {"b":-0.5,"d":-1,"a":+1};
    }

    read_environment(){
        `  
            Read Apple Position in the Grid: 
            Read Danger Positions in the Grid:
                Walls, Body Parts (snake tail)
            Read Current Cell of Snake:
                Blank, Danger, Apple
        `
        let env_sensor = {"applePos":[],"dangerPos":[]},
            pos_x,pos_y,pos_z;

        for(let i=0; i<walls.length;i++){
            pos_x = Math.round(walls[i].object.position.x);
            pos_y = Math.round(walls[i].object.position.y);
            pos_z = Math.round(walls[i].object.position.z);
            env_sensor["dangerPos"].push([pos_x,pos_y,pos_z])
        }

        env_sensor["applePos"].push(
            [apple.object.position.x,
             apple.object.position.y,
             apple.object.position.z]
        );

        return env_sensor;
    }
    read_text_env(pack){
        this.rewards = JSON.parse(pack["en_rew"]);
    }
}


