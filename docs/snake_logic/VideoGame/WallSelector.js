let coords_label = null;
window.addEventListener('load',()=>{
   let ob_x = document.getElementById('ob-x'),
       ob_y = document.getElementById('ob-y'),
       ob_z = document.getElementById('ob-z');
       
   let html_grid = '<div class="row justify-content-center"><div class="m-1 hover-blue d-flex justify-content-center font-electro font-weight-bold" style="width:22px;height:22px;border:rgb(85,85,85) 1px solid;font-size: 9pt">{0}</div></div>';
    let x_value=-1,y_value=-1,z_value=-1;
   //Creating wall selector UI
    window.wall_selector_resize = function(){
        let i;
        html_result = "";
        for(i=0; i<x;i++)
           html_result += html_grid.format(i);
        ob_x.innerHTML = html_result;
        html_result = "";
        for(i=0; i<y;i++)
           html_result += html_grid.format(i);
        ob_y.innerHTML = html_result;
        html_result ="";
        for(i=0; i<z;i++)
           html_result += html_grid.format(i);
        ob_z.innerHTML = html_result; 
           
        for(i=0; i<y; i++){
            ob_y.children[i].firstChild.addEventListener('click',element=>{
                if(y_value === -1){
                  y_value = Array.from(ob_y.children).indexOf(element.target.parentNode); //return index
                  element.target.style.backgroundColor = "red";
                  setBlock();
                }
            });
        }
            
        for(i=0; i<x; i++){
            ob_x.children[i].firstChild.addEventListener('click',element=>{
                if(x_value === -1){
                    x_value = Array.from(ob_x.children).indexOf(element.target.parentNode); //return index
                    element.target.style.backgroundColor = "red";
                    setBlock();
                }
            });
        }
        for(i=0; i<z; i++){
            ob_z.children[i].firstChild.addEventListener('click',element=>{
                if(z_value === -1){
                    z_value = Array.from(ob_z.children).indexOf(element.target.parentNode); //return index
                    element.target.style.backgroundColor = "red";
                    setBlock();
                }
            });
        }
    }
    wall_selector_resize();

    
   coords_label = document.getElementById('coords-label');
   let pyramid_icon_path = "./static/imgs/pyramid-icon-24.png",
           html_coord = `<div class="row justify-content-center">
                             <div class="col-10 d-flex align-items-center justify-content-around font-electro">
                                <img src="${pyramid_icon_path}" alt="pyramid-icon" width="22" height="22">
                                <p>PyObstacle (</p>
                                <p style="color:dodgerblue;font-size: 14pt" class="ob-coord-x"></p>
                                <p style="color: black">,</p>
                                <p style="color:dodgerblue; font-size: 14pt" class="ob-coord-y"></p>
                                <p style="color: black">,</p>
                                <p style="color:dodgerblue; font-size: 14pt" class="ob-coord-z"></p>
                                <p>)</p>
                            </div>
                            <div class="col-2 d-flex justify-content-center align-items-center" >
                                <div class="close-button ob-coord-delete"></div>
                            </div>
                        </div>`;
   let ob_coord_x, ob_coord_y,ob_coord_z, ob_coord_delete,coords = [],obstacles_counter_el = document.getElementById('description-obstacles-counter');
   
   
   function setBlock(){
       if(x_value!==-1 && y_value!==-1 && z_value!==-1 ){
            walls.add( new Wall(x_value,y_value,z_value).object );
            coords_label.innerHTML+=html_coord;
            ob_coord_x = document.getElementsByClassName("ob-coord-x");
            ob_coord_y = document.getElementsByClassName("ob-coord-y");
            ob_coord_z = document.getElementsByClassName("ob-coord-z");
            ob_coord_delete = document.getElementsByClassName("ob-coord-delete");
            ob_coord_x[ob_coord_x.length-1].innerHTML = x_value;
            ob_coord_y[ob_coord_x.length-1].innerHTML = y_value;
            ob_coord_z[ob_coord_x.length-1].innerHTML = z_value;
            obstacles_counter_el.innerHTML = String(walls.array.length);
            ob_coord_delete[ob_coord_delete.length-1].addEventListener("click",(element)=>{
                let index = Array.from(document.getElementsByClassName('close-button')).indexOf(element.currentTarget);
                scene.remove(walls.array[index]);
                walls.array.splice(index,1);
                coords_label.children[index].remove();
                obstacles_counter_el.innerHTML = String(walls.array.length);
            });
            clean_selector_display()
       }
   }


   function clean_selector_display(){
    let i;    
    for(i=0;i<x;i++){
        ob_x.children[i].firstChild.style.backgroundColor = "white";
        }
    for(i=0;i<y;i++){
        ob_y.children[i].firstChild.style.backgroundColor = "white";
    }
    for(i=0;i<z;i++){
        ob_z.children[i].firstChild.style.backgroundColor = "white";
    }
    x_value = -1; y_value = -1; z_value = -1;
   }
});
function delete_labeled_walls(){
    coords_label.innerHTML="";
  }