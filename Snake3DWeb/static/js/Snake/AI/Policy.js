class Policy{
    constructor(epsilon=0.1,discount_rate=0.7) {
        `
        N: Contains the number of times that an action has been selected in certain state.
        Q: Contains the values of actions in an certain state.
        `
        this.states = [];
        this.markov_trajectory = [];
        this.posible_actions=["a","d","w","s","e","q"];
        this.V = {}
        this.Q = {};
        this.entity = {};
        this.epsilon = epsilon;
        this.discount_rate = discount_rate;
        this.time_step = 0;
    }


    take_action_by_state(state){
      alert(state);
      let action,
          r = Math.random();
      if(this.epsilon > r || !this.states.includes(state)){
         action = this.posible_actions[Math.round(Math.random()*(this.posible_actions.length-1))];
         console.log(action);
      }else{
          action = this.posible_actions[0];
          for(let i=1; i<this.posible_actions.length;i++){
              if(this.Q[state][this.posible_actions[i]]>this.Q[state][action]){
                  action = this.posible_actions[i]
              }
          }
      }
      return action;
    }


    update(){

    }
    pr_of_a_by_s(action,state){
        return this.entity[state][action]
    }
    index_of(state){
        `Return the index of the state in this.state. if it does not exist return -1`
    }

}