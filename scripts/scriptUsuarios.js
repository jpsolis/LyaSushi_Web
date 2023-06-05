


// const CryptoJS = require("crypto-js");

const key = "12345";


function modalEditar(idUsuario, nombreUsuario, passUsuario, accion){
   
    var modal = document.getElementById("myModal");
    document.getElementById("titulo").innerText = accion + " registro";

    if(accion == "Insertar")
    {        
        
        
        document.getElementById('lblidUsuario').style.display = 'none';        
        document.getElementById('idUsuario').style.display = 'none'; 
        document.getElementById('accion').value = "Insertar";
    }
    else{
        document.getElementById("idUsuario").value = idUsuario;
        document.getElementById("nombreUsuario").value = nombreUsuario;        
        document.getElementById("passUsuario").value = passUsuario;        
        document.getElementById("accion").value = accion;
    
    }
    modal.style.display = "block";    

}

function cierreModal(){

    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("cierre")[0];
      span.onclick = function(){
        modal.style.display = "none";
    }
}

function ejecutarAccion(accion, idUsuario, nombreUsuario, passUsuario)
{
    console.log("Ejecutar accion " +accion+ " "+idUsuario+" "+nombreUsuario+" "+passUsuario);
    if(accion == "Editar")
    {

        http://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +idUsuario+"?")
               
        let url = "https://www.apirestaurant.somee.com/api/Usuario/Editar/";
        let registro = {
        "idUsuario": idUsuario,
        "nombreUsuario": nombreUsuario,
        "passUsuario": passUsuario
        }

        let options = {
        method: "PUT",
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(registro),
        }

        fetch(url, options)
        .then(response => console.log(response.status))

        alert("Registro modificado...")

        location.reload();
        
       
       
    }
    else if(accion == "Eliminar"){
        alert("Confirma "+accion+" el registro " +idUsuario+" ?");

        let url = "https://www.apirestaurant.somee.com/api/Usuario/Eliminar/" +idUsuario;
        console.log("URL: " +url);

        let registro = {
            "idUsuario": idUsuario,
            "nombreUsuario": nombreUsuario,
            "passUsuario": passUsuario
       }

       let options = {
         method: "DELETE",
         headers:{
             'Content-type': 'application/json'
         },
         body: JSON.stringify(registro),
       }

       fetch(url, options)
       .then(response => console.log(response.status))

       alert("Registro eliminado...")

       location.reload();
       

    }

    else{
        alert("Confirma "+accion+" el registro ?");

        let url = "https://www.apirestaurant.somee.com/api/Usuario/Guardar/";
        console.log("URL: " +url);

    //encriptar password
    var encriptado = CryptoJS.AES.encrypt(passUsuario, "12345");

    


        alert("Encruptado: " +encriptado);

    


        let registro = {
            //"iCodUnidad": iCodUnidad,
            "nombreUsuario": nombreUsuario,
            "passUsuario": encriptado.toString()    
       }

       let options = {
         method: "POST",
         headers:{
             'Content-type': 'application/json'
         },
         body: JSON.stringify(registro),
       }

       fetch(url, options)
       .then(response => console.log(response.status))

       alert("Registro ingresado...")

       location.reload();
       

      


    }
}


function cargarGrilla()
{
    console.log('cargar grilla usuarios...')
   

    const tabla = document.querySelector('#tablaUsuarios tbody')

    fetch('https://www.apirestaurant.somee.com/api/Usuario/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     for(let i = 0; i < data.response.length; i++){
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td>${data.response[i].idUsuario}</td>
        <td>${data.response[i].nombreUsuario}</td>        
        <td>${data.response[i].passUsuario}</td>        
        <td><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idUsuario}', '${data.response[i].nombreUsuario}', '${data.response[i].passUsuario}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idUsuario}', '${data.response[i].nombreUsuario}',  '${data.response[i].passUsuario}', 'Eliminar')"><i class="fa fa-trash"></i></a></td>
        `;

        tabla.appendChild(fila);
     }
   
});

cargarMenu();


}

function cargarMenu() {


   
    let contentHTML = '';

    const itemsMenu = document.querySelector('#item-menu');

    fetch('https://www.apirestaurant.somee.com/api/Menu/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log("lalala " +data);
      for(let i = 0; i < data.response.length; i++){

        const row = document.createElement("tr");

        console.log("Descripcion: " +data.response[i].descripcionMenu)

        contentHTML +=

        `<a href="${data.response[i].pathMenu}">
            <i class="fas fa-home"></i>
            <p>${data.response[i].descripcionMenu}</p>
        </a>`;


    }


    itemsMenu.innerHTML = contentHTML;
    

   
     });
     

      
    
    
}