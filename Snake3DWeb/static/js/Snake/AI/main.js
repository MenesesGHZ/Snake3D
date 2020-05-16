let env_elements,
    environment = new SnakeEnvironment(),
    agent = new SnakeAgent(),
    policy = new Policy(),
    state,
    action,
    sequence,
    reward;


function receive_time_step_signal(){
  env_elements = environment.read_environment();
  state = agent.read_state(env_elements);
  action = policy.take_action_by_state(state);
  reward = environment.rewards[agent.currentCell];
  if(environment.time_step === 0){
    reward=0;
  }
  sequence = [state,action,reward];
  environment.markov_trajectory.push(...sequence);
  environment.time_step+=1;
  if(agent.currentCell !== "d"){
    agent.do(action);
  }
}

function receive_update_signal(){
  policy.update_policy(environment.markov_trajectory);
  environment.markov_trajectory = [];
  environment.time_step = 0;

}