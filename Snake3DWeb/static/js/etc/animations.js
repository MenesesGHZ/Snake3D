window.addEventListener('load',()=>{

    const theory_div = new TimelineLite({paused:true}),
          features_div = new TimelineLite({paused:true}),
          features_nav = new TimelineLite({paused:true}),
          obstacles_nav = new TimelineLite({paused:true});

    theory_div.fromTo("#theory-div",0.25,{x:"-101%"},{x:"0%"});
    features_div.fromTo('#features-div',0.25,{x:"-101%"},{x:"0%"});
    features_nav.fromTo("#features-nav",0.3,{x:"-101%"},{x:"0%"});
    obstacles_nav.fromTo("#obstacles-nav",0.3,{x:"-101%"},{x:"0%"});
    let left_nav_menu_able = true;

    let left_nav_el = document.getElementById('main-left-nav'),
        features_nav_el = document.getElementById('features-nav'),
        obstacles_nav_el = document.getElementById('obstacles-nav');
    let go_back_features = document.getElementById('go-back-features'),
        go_back_obstacles = document.getElementById('go-back-obstacles');

    document.getElementById('theory-container').addEventListener('mouseenter',()=>{
        if(left_nav_menu_able) theory_div.play();
    });
    document.getElementById('theory-container').addEventListener('mouseleave',()=>{
        if(left_nav_menu_able) theory_div.reverse();
    });
     document.getElementById('features-container').addEventListener('mouseenter',()=>{
        if(left_nav_menu_able) features_div.play();
    });
    document.getElementById('features-container').addEventListener('mouseleave',()=>{
        if(left_nav_menu_able) features_div.reverse();
    });

    document.getElementById('features-div').addEventListener('click',()=>{
        left_nav_menu_able = false
        features_div.reverse();
        left_nav_el.classList.add('d-none');
        features_nav_el.classList.remove('d-none');
        features_nav.play();
    });

    document.getElementById('feature-obstacles').addEventListener('click',()=>{
        features_nav.reverse();
        features_nav_el.classList.add('d-none');
        obstacles_nav_el.classList.remove('d-none');
        obstacles_nav.play();
    });



    /*GO BACKS*/
    go_back_features.addEventListener('click',()=>{
       features_nav.reverse();
       features_nav_el.classList.add('d-none');
       left_nav_menu_able = true;
       left_nav_el.classList.remove('d-none');
    });
    go_back_obstacles.addEventListener('click',()=>{
        obstacles_nav.reverse();
        obstacles_nav_el.classList.add('d-none');
        features_nav_el.classList.remove('d-none');
        features_nav.play();
    });






});