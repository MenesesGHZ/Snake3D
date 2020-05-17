let score_el,episode_el;
window.addEventListener('load',()=>{
    score_el = document.getElementById('description-score');
    episode_el = document.getElementById('description-iteration');
});

function right_bar_update(score=null){
    if(score!==null && parseInt(score_el.innerHTML)<score){
        score_el.innerHTML = parseInt(score_el.innerHTML) + 1;
    }else{
        episode_el.innerHTML = parseInt(episode_el.innerHTML) + 1;
    }

}

