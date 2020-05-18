let score_el,episode_el, length_el;
window.addEventListener('load',()=>{
    score_el = document.getElementById('description-score');
    episode_el = document.getElementById('description-iteration');
    length_el = document.getElementById('description-snake-length');
});

function right_bar_update(score=null){
    if(score!==null ){
        length_el.innerHTML = score+1
        if( parseInt(score_el.innerHTML)<score){
            score_el.innerHTML = parseInt(score_el.innerHTML) + 1;
        }
    }else{
        episode_el.innerHTML = parseInt(episode_el.innerHTML) + 1;
        length_el.innerHTML = 1;

    }

}

