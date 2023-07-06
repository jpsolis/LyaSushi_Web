function modalEditar(idApanado, descripcionApanado, precioUnitario, precio, cantidad, accion){
   
    var modal = document.getElementById("myModal");
    document.getElementById("titulo").innerText = accion + " registro";

    if(accion == "Insertar")
    {        
        
        
        document.getElementById('lblidApanado').style.display = 'none';        
        document.getElementById('idApanado').style.display = 'none'; 
        document.getElementById('accion').value = "Insertar";
    }
    else{
        document.getElementById("idApanado").value = idApanado;
        document.getElementById("descripcionApanado").value = descripcionApanado;        
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

function ejecutarAccion(accion, idApanado, descripcionApanado, precioUnitario, precio, cantidad)
{
    console.log("Ejecutar accion " +accion+ " "+idApanado+" "+descripcionApanado +" "+ precioUnitario +" "+precio+" "+cantidad );
    if(accion == "Editar")
    {

        http://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +idApanado+"?")
               
        let url = "https://www.apirestaurant.somee.com/api/Apanado/Editar/";
        let registro = {
            "idApanado": idApanado,
            "descripcionApanado": descripcionApanado,        
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
        alert("Confirma "+accion+" el registro " +idApanado+" ?");

        let url = "https://www.apirestaurant.somee.com/api/Apanado/Eliminar/" +idApanado;
        console.log("URL: " +url);

        let registro = {
            "idApanado": idApanado,
            "descripcionApanado": descripcionApanado,        
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

        let url = "https://www.apirestaurant.somee.com/api/Apanado/Guardar/";
        console.log("URL: " +url);

        let registro = {
            //"idEmpanada": idEmpanada,
            "descripcionApanado": descripcionApanado,        
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
    console.log('cargar grilla apanados...')
   

    const tabla = document.querySelector('#tabla tbody')

    fetch('https://www.apirestaurant.somee.com/api/Apanado/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     for (let i = 0; i < data.response.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td data-cell="idApanado">${data.response[i].idApanado}</td>
        <td data-cell="descripcion Apanado">${data.response[i].descripcionApanado}</td>        
        <td data-cell="precio Unitario">${data.response[i].precioUnitario}</td>        
        <td data-cell="precio">${data.response[i].precio}</td>        
        <td data-cell="cantidad">${data.response[i].cantidad}</td>        
        <td data-cell="editar"><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idApanado}', '${data.response[i].descripcionApanado}', '${data.response[i].precioUnitario}', '${data.response[i].precio}', '${data.response[i].cantidad}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td data-cell="eliminar"><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idApanado}', '${data.response[i].descripcionApanado}', '${data.response[i].precioUnitario}', '${data.response[i].precio}', '${data.response[i].cantidad}','Eliminar')"><i class="fa fa-trash"></i></a></td>
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