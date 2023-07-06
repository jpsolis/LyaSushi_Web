function modalEditar(iCodUnidad, vDescripcion, accion){
   
    var modal = document.getElementById("myModal");
    document.getElementById("titulo").innerText = accion + " registro";

    if(accion == "Insertar")
    {        
        
        
        document.getElementById('lbliCodUnidad').style.display = 'none';        
        document.getElementById('iCodUnidad').style.display = 'none'; 
        document.getElementById('vDescripcion').style.display = 'none'; 
        document.getElementById('accion').value = "Insertar";
    }
    else{
        document.getElementById("iCodUnidad").value = iCodUnidad;
        document.getElementById("vDescripcion").value = vDescripcion;        
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

function ejecutarAccion(accion, iCodUnidad, vDescripcion)
{
    console.log("Ejecutar accion " +accion+ " "+iCodUnidad+" "+vDescripcion);
    if(accion == "Editar")
    {

        http://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +iCodUnidad+"?")
               
        let url = "https://www.apirestaurant.somee.com/api/Unidad/Editar/";
        let registro = {
        "iCodUnidad": iCodUnidad,
        "vDescripcion": vDescripcion               
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
        alert("Confirma "+accion+" el registro " +iCodUnidad+" ?");

        let url = "https://www.apirestaurant.somee.com/api/Unidad/Eliminar/" +iCodUnidad;
        console.log("URL: " +url);

        let registro = {
            "iCodUnidad": iCodUnidad,
            "vDescripcion": vDescripcion               
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

        let url = "https://www.apirestaurant.somee.com/api/Unidad/Guardar/";
        console.log("URL: " +url);

        let registro = {
            //"iCodUnidad": iCodUnidad,
            "vDescripcion": vDescripcion            
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
    console.log('cargar grilla unidades...')
   

    const tabla = document.querySelector('#tabla tbody')

    fetch('https://www.apirestaurant.somee.com/api/Unidad/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     for (let i = 0; i < data.response.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td data-cell="código unidad">${data.response[i].iCodUnidad}</td>
        <td data-cell="descripción">${data.response[i].vDescripcion}</td>        
        <td data-cell="editar"><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].iCodUnidad}', '${data.response[i].vDescripcion}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td data-cell="eliminar"><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].iCodUnidad}', '${data.response[i].vDescripcion}', 'Eliminar')"><i class="fa fa-trash"></i></a></td>
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