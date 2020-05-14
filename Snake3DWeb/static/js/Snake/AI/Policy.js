class Policy{
    constructor(epsilon=0.1,discount_rate=0.7) {
        `
        N: Contains the number of times that an action has been selected in certain state.
        Q: Contains the values of actions in an certain state.
        `
        this.states = [];
        this.posible_actions=["a","d","w","s","e","q"];
        this.Q = {};
        this.entity = {};
        this.epsilon = epsilon;
        this.discount_rate = discount_rate;
        this.epsiode_step = 1;

    }


    take_action_by_state(state){
      let action,
          r = Math.random();
      if(this.epsilon > r || !this.states.includes(state)){
         action = this.posible_actions[Math.round(Math.random()*(this.posible_actions.length-1))];
      }else{
          action = this.entity[state];
      }
      console.log(action);
      return action;
    }

    update_policy(sequence){
        let q_episode = 0, argmax_q_value = Number.MIN_SAFE_INTEGER, argmax_q_action, reward,state,action;
        for(let i=sequence.length-1; i>=0; i-=3){
            state = sequence[i-2];
            action = sequence[i-1]
            reward = sequence[i];
            q_episode = reward + this.discount_rate*q_episode;
            if(!Object.keys(this.Q).includes(sequence[state])){
                this.Q[state] = {};
                this.Q[state][action] = q_episode;
            }else{
                this.Q[state][action] = q_episode + this.epsiode_step*(q_episode - this.Q[state][action]);
            }
        }
        for (let [state, actions] of Object.entries(this.Q)) {
              for(let [action,q_value] of Object.entries(actions) ){
                    if(q_value>argmax_q_value){
                        argmax_q_action = action;
                    }
              this.entity[state] = argmax_q_action;
              argmax_q_value = Number.MIN_SAFE_INTEGER;
            }
        }
        this.epsiode_step+=1
    }

    index_of(state){
        `Return the index of the state in this.state. if it does not exist return -1`
    }

}