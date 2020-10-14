class Policy{
    constructor(epsilon=0.1,discount_rate=0.7) {
        `
        N: Contains the number of times that an action has been selected in certain state.
        Q: Contains the values of actions in an certain state.
        `
        this.posible_actions=["a","w","s","d","none"];
        this.Q = {};
        this.QN = {};
        this.entity = {}
        this.epsilon = epsilon;
        this.discount_rate = discount_rate;
    }

    take_action_by_state(state){
      let action,
          r = Math.random();
      if(this.epsilon > r || !Object.keys(this.entity).includes(state)){
         action = this.posible_actions[Math.round(Math.random()*(this.posible_actions.length-1))];
      }else{
          action = this.entity[state];
      }
      return action;
    }


    update_policy(sequence){
        let Gt = 0, Gt_avg=0 ,argmax_q_value = Number.MIN_SAFE_INTEGER, argmax_q_action, reward,state,action;       
        for(let i=sequence.length-1; i>=1; i-=3){
            reward = sequence[i];
            action = sequence[i-1];
            state = sequence[i-2];
            if(!Object.keys(this.Q).includes(state)){ 
                this.Q[state] = {"a":0,"w":0,"s":0,"d":0,"none":0};
                this.QN[state] = {"a":0,"w":0,"s":0,"d":0,"none":0};
            }
            this.QN[state][action]+=1;
            this.Q[state][action] = this.Q[state][action] + ((1/this.QN[state][action])*(Gt - this.Q[state][action]));
            Gt = reward + this.discount_rate*Gt;
        }

        for (let [state, actions] of Object.entries(this.Q)) {
              for(let [action,q_value] of Object.entries(actions) ){
                  if(q_value>argmax_q_value){
                        argmax_q_action = action;
                        argmax_q_value = q_value;
                    }
                }
              this.entity[state] = argmax_q_action;
              argmax_q_value = Number.MIN_SAFE_INTEGER;
        }
    }




    read_text_policy(pack){
        this.Q = pack["Q"];
        this.QN= pack["QN"];
        this.entity = pack["entity"];
        this.epsilon = pack["eps"];
        this.discount_rate = pack["gamma"];
    }

    index_of(state){
        `Return the index of the state in this.state. if it does not exist return -1`
    }
}