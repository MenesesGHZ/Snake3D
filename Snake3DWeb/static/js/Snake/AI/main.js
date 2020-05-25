let env_elements,
    environment = new SnakeEnvironment(),
    agent = new SnakeAgent(),
    policy = new Policy(),
    state,
    action,
    sequence,
    reward;


function time_step_signal(){
  env_elements = environment.read_environment();
  state = agent.read_state(env_elements);
  action = policy.take_action_by_state(state); 
  reward = environment.rewards[agent.currentCell];
  if(environment.time_step === 0){
    reward=0;
  }
  sequence = [state,action,reward]; 
  environment.markov_trajectory.push(...sequence);
  if(agent.currentCell !== "d"){
    agent.do(action);
  }
  environment.time_step+=1;
}



function receive_update_signal(){
  update_statistic_data();  
  policy.update_policy(environment.markov_trajectory);
  environment.markov_trajectory = [];
  environment.time_step = 0;
  environment.episode_step+=1;
  if(environment.max_score < snake.body[0].length-1){
      environment.max_score = snake.body[0].length-1;
  }
}


function read_learning(){
  let rawFile = new XMLHttpRequest();
      let file_path = static_path + "js/Snake/AI/brain.json"
        rawFile.open("GET",file_path,false);
          rawFile.onreadystatechange = function() {
              if(rawFile.readyState === 4) {
                  if(rawFile.status === 200 || rawFile.status === 0) {
                       let pack = JSON.parse(JSON.parse(rawFile.response));
                      policy.read_text_policy(pack);
                      environment.read_text_env(pack);
                      episode_el.innerHTML = pack["es"];
                      score_el.innerHTML = pack["max_score"];
                  }
              }
          }
          rawFile.send(null);
}