class SnakeEnvironment{
    constructor(grid_size=[4,4,4]) {
         let cells_type = ["blank","obstacle","apple","body","outside"],
            positions = this.compute_positions(grid_size),
            directions = ['a','d','w','s','e','q'];
        this.time_step = 0;
        this.states = this.compute_states(cells_type,positions,directions); //|states| = |CellTypes| * |Posible Positions| * |Posible Directions| = 5 * x * 6 = 30x
        this.state_at_t; // index of this.states //
        this.rewards = {"blank":-1,"body":-1,"outside":-1,"obstacle":-2,"apple":+1};
        this.Gt;
        this.discount_rate = 0.7;
    }

    set_apple_location(coords){
        this.appleLocation = coords;
    }

    make_step(){
        this.read_state();
        this.time_step+=1;
        return reward;
    }

    end_episode(){
       /*When Snake AI has Loose*/
    }

    read_state(){
        /*Get Cell Type, Snake Location and AppleLocation*/

    }

    reward_t_a(time_step,action){

    }

    discounted_return(){

    }

    compute_positions(grid_size){
        let output = [];
        for(let i=-1;i<grid_size[0]+1;i++)
            for(let j=-1;j<grid_size[1]+1;j++)
                for(let k=-1;k<grid_size[2]+1;k++)
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
}