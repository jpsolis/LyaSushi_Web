function modalEditar(idEmpanada, descripcionEmpanada, precioUnitario, precio, cantidad, accion){
   
    var modal = document.getElementById("myModal");
    document.getElementById("titulo").innerText = accion + " registro";

    if(accion == "Insertar")
    {        
        
        
        document.getElementById('lblidEmpanada').style.display = 'none';        
        document.getElementById('idEmpanada').style.display = 'none'; 
        document.getElementById('accion').value = "Insertar";


      
    }
    else{
        document.getElementById("idEmpanada").value = idEmpanada;
        document.getElementById("descripcionEmpanada").value = descripcionEmpanada;        
        document.getElementById("precioUnitario").value = precioUnitario;        
        document.getElementById("precio").value = precio;        
        document.getElementById("cantidad").value = cantidad;        
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

function ejecutarAccion(accion, idEmpanada, descripcionEmpanada, precioUnitario, precio, cantidad)
{
    console.log("Ejecutar accion " +accion+ " "+idEmpanada+" "+descripcionEmpanada +" "+ precioUnitario +" "+precio+" "+cantidad );
    if(accion == "Editar")
    {

        http://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +idEmpanada+"?")
               
        let url = "https://www.apirestaurant.somee.com/api/Empanada/Editar/";
        let registro = {
            "idEmpanada": idEmpanada,
            "descripcionEmpanada": descripcionEmpanada,        
            "precioUnitario": precioUnitario,        
            "precio": precio,        
            "cantidad": cantidad         
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
        alert("Confirma "+accion+" el registro " +idEmpanada+" ?");

        let url = "https://www.apirestaurant.somee.com/api/Empanada/Eliminar/" +idEmpanada;
        console.log("URL: " +url);

        let registro = {
            "idEmpanada": idEmpanada,
            "descripcionEmpanada": descripcionEmpanada,        
            "precioUnitario": precioUnitario,        
            "precio": precio,        
            "cantidad": cantidad       
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

        let url = "https://www.apirestaurant.somee.com/api/Empanada/Guardar/";
        console.log("URL: " +url);

        let registro = {
            //"idEmpanada": idEmpanada,
            "descripcionEmpanada": descripcionEmpanada,        
            "precioUnitario": precioUnitario,        
            "precio": precio,        
            "cantidad": cantidad       
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
    console.log('cargar grilla empanadas...')
   

    const tabla = document.querySelector('#tablaEmpanadas tbody')

    fetch('https://www.apirestaurant.somee.com/api/Empanada/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     for (let i = 0; i < data.response.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td>${data.response[i].idEmpanada}</td>
        <td>${data.response[i].descripcionEmpanada}</td>        
        <td>${data.response[i].precioUnitario}</td>        
        <td>${data.response[i].precio}</td>        
        <td>${data.response[i].cantidad}</td>        
        <td><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idEmpanada}', '${data.response[i].descripcionEmpanada}', '${data.response[i].precioUnitario}', '${data.response[i].precio}', '${data.response[i].cantidad}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idEmpanada}', '${data.response[i].descripcionEmpanada}', '${data.response[i].precioUnitario}', '${data.response[i].precio}', '${data.response[i].cantidad}','Eliminar')"><i class="fa fa-trash"></i></a></td>
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
     for (let i = 0; i < data.response.length; i++) {

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