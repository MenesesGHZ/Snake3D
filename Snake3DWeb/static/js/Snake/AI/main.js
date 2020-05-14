let env_elements,
    environment = new SnakeEnvironment(),
    agent = new SnakeAgent(),
    policy = new Policy(),
    state,
    action,
    reward = 0;


function receive_time_step_signal(){
  env_elements = environment.read_environment();
  state = agent.read_state(env_elements);
  action = policy.take_action_by_state(state);
  if(environment.time_step!==0){
    reward = environment.rewards[agent.currentCell];
  }
  environment.markov_trajectory.push(state,action,reward);
  agent.do(action);
}

function receive_update_signal(){
  policy.update_policy(environment.markov_trajectory);

}