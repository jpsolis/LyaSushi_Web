// document.querySelector("#submitLogin").onclick = function(){
//     alert("estamos aqui");
// }

function submitLogin() {
    
   

    var user = document.getElementById("logemail").value;
    var pass = document.getElementById("logpass").value;

   // alert("Usuario: " +user+ "Password: " +pass)

//    let correo = document.forms.user.value;

   if( validMail(user)){
   
    window.location.replace("menu.html");
   }
   else{
   alert("mail no válido")
   }
   
   
}









//http://localhost/LyaSushi_Api_v2/menu/api/menu

function cargarMenu() {

    let contentHTML = '';

    const itemsMenu = document.querySelector('#item-menu');


    let loader = '<div class="loader"></div>';
    document.getElementById('center-screen').innerHTML = loader;



    fetch('http://localhost/LyaSushi_Api_v2/menu/api/menu/Get')
    .then((response) => response.json())
    .then((data) => {
     console.log(data);
      for(let i = 0; i < data.length; i++){

        const row = document.createElement("tr");

        console.log("Descripcion: " +data[i].descripcion)

        contentHTML +=

        `<a href="${data[i].pathMenu}">
            <i class="fas fa-home"></i>
            <p>${data[i].descripcionMenu}</p>
        </a>`;


    }


    itemsMenu.innerHTML = contentHTML;

    document.getElementById('center-screen').innerHTML = '';
    

   
     });

      
    
    
}