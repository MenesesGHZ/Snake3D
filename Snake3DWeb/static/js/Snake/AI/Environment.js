class SnakeEnvironment{
    constructor() {
        `
        this.rewards: Blank = -0.5, Danger = -2, Apple = +2
        `
        this.time_step = 0;
        this.markov_trajectory = [];
        this.rewards = {"b":-0.5,"d":-2,"a":+2};
        this.episode_step = 1;
        this.max_score = 0;
    }

    read_environment(){
        `  
            Read Apple Position in the Grid: 
            Read Danger Positions in the Grid:
                Walls, Body Parts (snake tail)
            Read Current Cell of Snake:
                Blank, Danger, Apple
        `
        let env_sensor = {"applePos":[
             apple.object.position.x,
             apple.object.position.y,
             apple.object.position.z
                ], "dangerPos":[]},
            pos_x,pos_y,pos_z;

        for(let i=0; i<walls.length;i++){
            pos_x = Math.round(walls[i].object.position.x);
            pos_y = Math.round(walls[i].object.position.y);
            pos_z = Math.round(walls[i].object.position.z);
            env_sensor["dangerPos"].push([pos_x,pos_y,pos_z])
        }
        return env_sensor;
    }
    read_text_env(pack){
        this.rewards = pack["en_rew"];
        this.episode_step = pack["es"];
        this.max_score = pack["max_score"];
    }
}


