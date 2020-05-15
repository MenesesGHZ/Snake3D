let env_elements,
    environment = new SnakeEnvironment(),
    agent = new SnakeAgent(),
    policy = new Policy(),
    state,
    action,
    sequence,
    reward = 0;


function receive_time_step_signal(){
  env_elements = environment.read_environment();
  state = agent.read_state(env_elements);
  action = policy.take_action_by_state(state);
  reward = environment.rewards[agent.currentCell];
  alert(agent.currentCell);
  if(environment.time_step === 0){
    reward=0;
  }
  sequence = [reward,state,action];
  if(agent.currentCell !== "d"){
    agent.do(action)
  }
  if(agent.currentCell === "d") {
    sequence = [reward,state];
  }

  environment.markov_trajectory.push(...sequence);
  environment.time_step+=1;
}

function receive_update_signal(){
  policy.update_policy(environment.markov_trajectory);

}