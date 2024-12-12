function modalEditar(idGyosa, descripcionGyosa, precioUnitario, precio, cantidad, accion){
   
    var modal = document.getElementById("myModal");
    document.getElementById("titulo").innerText = accion + " registro";

    if(accion == "Insertar")
    {        
        
        
        document.getElementById('lblidGyosa').style.display = 'none';        
        document.getElementById('idGyosa').style.display = 'none'; 
        document.getElementById('accion').value = "Insertar";
    }
    else{
        document.getElementById("idGyosa").value = idGyosa;
        document.getElementById("descripcionGyosa").value = descripcionGyosa;        
        document.getElementById("precioUnitario").value = precioUnitario;        
        document.getElementById("precio").value = precio;        
        document.getElementById("cantidad").value = cantidad;        
        document.getElementById("accion").value = accion; 
               
    
    }
    modal.style.display = "block";    

}

function buscar(){
   

    var texto = document.getElementById("txtBuscar").value; 
    
    const tabla = document.querySelector('#tabla tbody')
    tabla.innerHTML = '';



    // fetch('https://localhost/LyaSushi_Api_v2/Ingrediente/api/Ingrediente/Get')
    fetch('https://apirestaurant.somee.com/api/Gyosa/Buscar/' +texto)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

           

            for (let i = 0; i < data.response.length; i++) {
                const fila = document.createElement('tr');
                fila.innerHTML += `
        <td data-cell="idGyosa">${data.response[i].idGyosa}</td>
        <td data-cell="descripcionGyosa">${data.response[i].descripcionGyosa}</td>   
        <td data-cell="precioUnitario">${data.response[i].precioUnitario}</td>   
        <td data-cell="precio">${data.response[i].precio}</td>    
        <td data-cell="cantidad">${data.response[i].cantidad}</td>        
        <td data-cell="editar"><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idBebestible}', '${data.response[i].descripcionBebestible}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td data-cell="eliminar"><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idBebestible}', '${data.response[i].descripcionBebestible}', 'Eliminar')"><i class="fa fa-trash"></i></a></td>
        `;
                tabla.appendChild(fila);
            }
        });



}

function cierreModal(){

    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("cierre")[0];
      span.onclick = function(){
        modal.style.display = "none";
    }
}

function ejecutarAccion(accion, idGyosa, descripcionGyosa, precioUnitario, precio, cantidad)
{
    console.log("Ejecutar accion " +accion+ " "+idGyosa+" "+descripcionGyosa +" "+ precioUnitario +" "+precio+" "+cantidad );
    if(accion == "Editar")
    {

        https://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +idGyosa+"?")
               
        let url = "https://www.apirestaurant.somee.com/api/Gyosa/Editar/";
        let registro = {
            "idGyosa": idGyosa,
            "descripcionGyosa": descripcionGyosa,        
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
        alert("Confirma "+accion+" el registro " +idGyosa+" ?");

        let url = "https://www.apirestaurant.somee.com/api/Gyosa/Eliminar/" +idGyosa;
        console.log("URL: " +url);

        let registro = {
            "idGyosa": idGyosa,
            "descripcionGyosa": descripcionGyosa,        
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

        let url = "https://www.apirestaurant.somee.com/api/Gyosa/Guardar/";
        console.log("URL: " +url);

        let registro = {
            //"idEmpanada": idEmpanada,
            "descripcionGyosa": descripcionGyosa,        
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
    console.log('cargar grilla gyosas...')
   

    const tabla = document.querySelector('#tabla tbody')

    fetch('https://www.apirestaurant.somee.com/api/Gyosa/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     for (let i = 0; i < data.response.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td data-cell="idGyosa">${data.response[i].idGyosa}</td>
        <td data-cell="descripcion Gyosa">${data.response[i].descripcionGyosa}</td>        
        <td data-cell="precioUnitario">${data.response[i].precioUnitario}</td>        
        <td data-cell="precio">${data.response[i].precio}</td>        
        <td data-cell="cantidad">${data.response[i].cantidad}</td>        
        <td data-cell="editar"><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idGyosa}', '${data.response[i].descripcionGyosa}', '${data.response[i].precioUnitario}', '${data.response[i].precio}', '${data.response[i].cantidad}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td data-cell="eliminar"><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idGyosa}', '${data.response[i].descripcionGyosa}', '${data.response[i].precioUnitario}', '${data.response[i].precio}', '${data.response[i].cantidad}','Eliminar')"><i class="fa fa-trash"></i></a></td>
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