let score_el,episode_el, length_el,gridSize_el;
window.addEventListener('load',()=>{
    score_el = document.getElementById('description-score');
    episode_el = document.getElementById('description-iteration');
    length_el = document.getElementById('description-snake-length');
    gridSize_el = document.getElementById('description-grid-size');
    method_el = document.getElementById('description-method')
});

function right_bar_update(length=null){
    if(length!==null ){
        length_el.innerHTML = length;
        if( parseInt(score_el.innerHTML)<length-1){
            score_el.innerHTML = parseInt(score_el.innerHTML) + 1;
        }
    }else{
        episode_el.innerHTML = parseInt(episode_el.innerHTML) + 1;
        length_el.innerHTML = 1;
    }
}


