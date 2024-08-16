function usuarioValido(user, password)
{

     var encriptado = CryptoJS.AES.encrypt(password, "12345");
    // alert("Encriptado: " +encriptado);
    
        fetch('https://www.apirestaurant.somee.com/api/Usuario/Obtener/'+user)
        .then((response) =>{
            response.json().then((jsonResponse) => {
              console.log(jsonResponse.response.nombreUsuario);   
                
                console.log("Password ingresada : " +password) 

                var desencriptado = CryptoJS.AES.decrypt(jsonResponse.response.passUsuario, '12345').toString(CryptoJS.enc.Utf8); 
            
                console.log("Password de json asi tal cual : " +jsonResponse.response.passUsuario) ;
                console.log("Password de json pero desencriptada : " +desencriptado) ;

                if(password === desencriptado)
                {
                    console.log("Son iguales");

                    window.location.replace("menu.html");
                }
                else{
                    alert("No son iguales...!!!");
                }
              })
              // assuming your json object is wrapped in an array
            //  response.json().then(i => i.forEach(i => console.log(i.nombreUsuario)))
            }).catch((err) => {
              console.log(`Error: ${err}` )
            });
 
}


function submitLogin() {
    
    var user = document.getElementById("logemail").value;
    var pass = document.getElementById("logpass").value;

   // alert("Usuario: " +user+ "Password: " +pass)

//    let correo = document.forms.user.value;

   if( validMail(user)){


    usuarioValido(user, pass);
   
      //window.location.replace("menu.html");
   }
   else{
   alert("mail no válido")
   }
   
   
}


//https://localhost/LyaSushi_Api_v2/menu/api/menu

function cargarMenu() {

    let contentHTML = '';

    const itemsMenu = document.querySelector('#item-menu');

    let loader = '<div class="loader"></div>';
    document.getElementById('center-screen').innerHTML = loader;


    fetch('https://www.apirestaurant.somee.com/api/Menu/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log(data);
      for(let i = 0; i < data.response.length; i++){

        const row = document.createElement("tr");

        console.log("Descripcion: " +data.response[i].descripcionMenu)
        console.log("Path: " +data.response[i].pathMenu)

        contentHTML +=

        `<a href="${data.response[i].pathMenu}">
            <i class="fas fa-home"></i>
            <p>${data.response[i].descripcionMenu}</p>
        </a>`;

    }

    itemsMenu.innerHTML = contentHTML;

    document.getElementById('center-screen').innerHTML = '';    
   
     });
}