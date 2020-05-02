window.addEventListener('load',()=>{
   let ob_x = document.getElementById('ob-x'),
       ob_y = document.getElementById('ob-y'),
       ob_z = document.getElementById('ob-z');
   let html_grid = '<div class="row justify-content-center"><div class="m-1 hover-blue" style="width:22px;height:22px;border:rgb(85,85,85) 1px solid"> </div></div>',
       html_result = ""
   //Creating wall selector feature
    let i;
    for(i=0; i<x;i++)
       html_result += html_grid;
    html_result = "";
    for(i=0; i<y;i++)
       html_result += html_grid;
    html_result ="";
    for(i=0; i<z;i++)
       html_result += html_grid;

    ob_x.innerHTML = html_result;
    ob_y.innerHTML = html_result;
    ob_z.innerHTML = html_result;

    //Add functionality to the grid
   let x_value=-1,y_value=-1,z_value=-1;
   for(i=0; i<x; i++){
       ob_x.children[i].firstChild.addEventListener('click',element=>{
           if(x_value === -1){
              x_value = Array.from(ob_x.children).indexOf(element.target.parentNode); //return index
             element.target.style.backgroundColor = "red";
             setBlock();
             //AGREGAR ANIMACION
           }
       });
   }

   for(i=0; i<y; i++){
       ob_y.children[i].firstChild.addEventListener('click',element=>{
           if(y_value === -1){
              y_value = Array.from(ob_y.children).indexOf(element.target.parentNode); //return index
             element.target.style.backgroundColor = "red";
             setBlock();
             //AGREGAR ANIMACION
           }
       });
   }

   for(i=0; i<z; i++){
       ob_z.children[i].firstChild.addEventListener('click',element=>{
           if(z_value === -1){
             z_value = Array.from(ob_z.children).indexOf(element.target.parentNode); //return index
             element.target.style.backgroundColor = "red";
             setBlock();
             //AGREGAR ANIMACION
           }
       });
   }


   function setBlock(){
       if(x_value!==-1 && y_value!==-1 && z_value!==-1 ){
            console.log(x_value,y_value,z_value)
            walls.add( new Wall(x_value,y_value,z_value) );
       }
   }

});