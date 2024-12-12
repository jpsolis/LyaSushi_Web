function modalEditar(idBaseIngrediente, idIngrediente, descripcionBase, idBase, idUnidad, cantidad, accion){
   
    var modal = document.getElementById("myModal");
    document.getElementById("titulo").innerText = accion + " registro";

    if(accion == "Insertar")
    {        
        
        
        document.getElementById('lblIdBaseIngrediente').style.display = 'none';        
        document.getElementById('idBaseIngrediente').style.display = 'none'; 
        document.getElementById('accion').value = "Insertar";
    }
    else{
        document.getElementById("idBaseIngrediente").value = idBaseIngrediente;
        document.getElementById("idIngrediente").value = idIngrediente;        
        document.getElementById("descripcionBase").value = descripcionBase;        
        document.getElementById("idBase").value = idBase;        
        document.getElementById("idUnidad").value = idUnidad;        
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

function ejecutarAccion(accion, idBaseIngrediente, idIngrediente, descripcionBase, idBase, idUnidad, cantidad)
{
    console.log("Ejecutar accion " +accion+ " "+idBaseIngrediente+" "+idIngrediente +" "+ descripcionBase +" "+idBase+" "+idUnidad+" "+cantidad );
    if(accion == "Editar")
    {

        https://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +idBaseIngrediente+"?")
               
        let url = "https://www.apirestaurant.somee.com/api/BaseIngrediente/Editar/";
        let registro = {
        "idBaseIngrediente": idBaseIngrediente,
        "idIngrediente": idIngrediente,        
        "descripcionBase": descripcionBase,        
        "idBase": idBase,        
        "idUnidad": idUnidad,
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
        alert("Confirma "+accion+" el registro " +idBaseIngrediente+" ?");

        let url = "https://www.apirestaurant.somee.com/api/BaseIngrediente/Eliminar/" +idBaseIngrediente;
        console.log("URL: " +url);

        let registro = {
            "idBaseIngrediente": idBaseIngrediente,
            "idIngrediente": idIngrediente,        
            "descripcionBase": descripcionBase,        
            "idBase": idBase,        
            "idUnidad": idUnidad,
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

        let url = "https://www.apirestaurant.somee.com/api/BaseIngrediente/Guardar/";
        console.log("URL: " +url);

        let registro = {
            "idIngrediente": idIngrediente,        
            "descripcionBase": descripcionBase,        
            "idBase": idBase,        
            "idUnidad": idUnidad,
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


function buscar(){
   

    var texto = document.getElementById("txtBuscar").value; 
    
    const tabla = document.querySelector('#tabla tbody')
    tabla.innerHTML = '';



    // fetch('https://localhost/LyaSushi_Api_v2/Ingrediente/api/Ingrediente/Get')
    fetch('https://apirestaurant.somee.com/api/BaseIngrediente/Buscar/' +texto)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

           

            for (let i = 0; i < data.response.length; i++) {
                const fila = document.createElement('tr');
                fila.innerHTML += `
        <td data-cell="idSalsa">${data.response[i].idBaseIngrediente}</td>
        <td data-cell="descripcionSalsa">${data.response[i].idIngrediente}</td>   
        <td data-cell="precioUnitario">${data.response[i].descripcionBase}</td>   
        <td data-cell="precio">${data.response[i].idBase}</td>   
        <td data-cell="precio">${data.response[i].idUnidad}</td>    
        <td data-cell="cantidad">${data.response[i].cantidad}</td>        
        <td data-cell="editar"><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idBaseIngrediente}', '${data.response[i].descripcionBase}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td data-cell="eliminar"><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idBaseIngrediente}', '${data.response[i].descripcionBase}', 'Eliminar')"><i class="fa fa-trash"></i></a></td>
        `;
                tabla.appendChild(fila);
            }
        });



}


function cargarGrilla()
{
    console.log('cargar grilla base ingrediente...')
   

    const tabla = document.querySelector('#tabla tbody')

    fetch('https://www.apirestaurant.somee.com/api/BaseIngrediente/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     for (let i = 0; i < data.response.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td data-cell="idBebestible">${data.response[i].idBaseIngrediente}</td>
        <td data-cell="idIngrediente">${data.response[i].idIngrediente}</td>        
        <td data-cell="descripcionBase">${data.response[i].descripcionBase}</td>        
        <td data-cell="idBase">${data.response[i].idBase}</td>        
        <td data-cell="idUnidad">${data.response[i].idUnidad}</td>        
        <td data-cell="cantidad">${data.response[i].cantidad}</td> 
        <td data-cell="Editar"><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idBaseIngrediente}', '${data.response[i].idIngrediente}', '${data.response[i].descripcionBase}', '${data.response[i].idBase}', '${data.response[i].idUnidad}', '${data.response[i].cantidad}','Editar')">  <i class="fa fa-edit"></i></a></td>
        <td data-cell="Eliminar"><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idBaseIngrediente}', '${data.response[i].idIngrediente}', '${data.response[i].descripcionBase}', '${data.response[i].idBase}', '${data.response[i].idUnidad}','${data.response[i].cantidad}','Eliminar')"><i class="fa fa-trash"></i></a></td>
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