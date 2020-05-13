class Policy{
    constructor(states_length,exploration_degree=0.2) {
        this.states = [];
        this.N_of = [
            [{"a":0,"d":0,"w":0,"s":0,"e":0,"q":0}],
            []
        ];// Number of times that an action has been selected in state.
        this.Q = {"a":0,"d":0,"w":0,"s":0,"e":0,"q":0}; //Value of an Action
        this.Pr_AS = this.initialize_arbitrary_policy(states_length);
    }




    probability_of_a_by_s(action, state_index){
        return this.Pr_AS[action][state_index];
    }

    take_action_by_state(state){
      let action = UCB();
    }

    UCB(action){
      `Uper Confidence Bound Action Selection Method`
    }

    index_of(state){
        `Return the index of the state in this.state. if it does not exist return -1`

    }



    initialize_arbitrary_policy(states_length){
        let output = {"a":[],"d":[],"w":[],"s":[],"e":[],"q":[]},
            array = [];
        for(let i=0; i<states_length;i++){
            array.push([1/6]);
        }
        output["a"] = array;
        output["d"] = array;
        output["w"] = array;
        output["s"] = array;
        output["e"] = array;
        output["q"] = array;
        return output;
    }


}