window.addEventListener('load',()=>{
    let text_el = document.getElementById("welcome-content"),
        welcome_text = ` 
        <div class="row my-3 justify-content-center">
            <div class="col-10">
                <p class="font-times text-center" >
                    We are two students from CETYS University that are currently studying 
                    computational science in fourth semester. This platform was a final project
                    of computer graphics asignature, but we wanted
                    to develop more than an oriented graphic project.
                </p>
            </div>
        </div>
     `;
    welcome_text += ` 
    <div class="row mt-3 mb-2 justify-content-center">
        <p class="font-times"> Developer Team: </p>
    </div>
    <div class="row justify-content-around mx-4 ">
        <p class="font-times">
        Gerardo Hern&#225;ndez Meneses 
        </p> 
        <p class="font-times" style="color:#961bff">
            AI and Game Programmer
        </p> 
    </div>
    <div class="row justify-content-around mx-4">
        <p class="font-times">
        Pablo Diaz Ochoa
        </p> 
        <p class="font-times" style="color:#961bff">
           Game Programmer
        </p> 
    </div>`;
    welcome_text += `
    <div class="row my-4 justify-content-center align-items-center">
    <a href="https://github.com/MenesesGHZ/Snake3D">
    <img src="{0}imgs/github-icon.png" alt="img"  width="auto" height="auto">
    </a>
</div>`.format(static_path);

    let warning_text = `<div class="row justify-content-center align-items-center">
                    <div class="col-11">
                        <p class="font-times text-center" style="color:red; font-size:10pt">
                            * You are now in a mobile version.
                            To enjoy the full experience we recommend you to vist from a Desktop Device. *
                        </p>
                    </div>
                </div>`

    if(isMobile()){
        text_el.innerHTML+= welcome_text + warning_text;
        $('#exampleModal').modal('show');
    }else{
        text_el.innerHTML+= welcome_text;
        $('#exampleModal').modal('show');
    }

});