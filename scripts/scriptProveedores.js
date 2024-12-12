function modalEditar(idProveedor, descripcionProveedor, accion){
   
    var modal = document.getElementById("myModal");
    document.getElementById("titulo").innerText = accion + " registro";

    if(accion == "Insertar")
    {        
        
        
        document.getElementById('lblProveedor').style.display = 'none';        
        document.getElementById('idProveedor').style.display = 'none'; 
        document.getElementById('accion').value = "Insertar";
    }
    else{
        document.getElementById("idProveedor").value = idProveedor;
        document.getElementById("descripcionProveedor").value = descripcionProveedor;        
        document.getElementById("accion").value = accion;
    
    }
    modal.style.display = "block";    

}

function buscar(){
   

    var texto = document.getElementById("txtBuscar").value; 
    
    const tabla = document.querySelector('#tabla tbody')
    tabla.innerHTML = '';



    // fetch('https://localhost/LyaSushi_Api_v2/Ingrediente/api/Ingrediente/Get')
    fetch('https://apirestaurant.somee.com/api/Proveedor/Buscar/' +texto)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

           

            for (let i = 0; i < data.response.length; i++) {
                const fila = document.createElement('tr');
                fila.innerHTML += `
        <td data-cell="idProveedor">${data.response[i].idProveedor}</td>
        <td data-cell="descripcionProveedor">${data.response[i].descripcionProveedor}</td>           
        <td data-cell="editar"><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idProveedor}', '${data.response[i].descripcionProveedor}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td data-cell="eliminar"><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idProveedor}', '${data.response[i].descripcionProveedor}', 'Eliminar')"><i class="fa fa-trash"></i></a></td>
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

function ejecutarAccion(accion, idProveedor, descripcionProveedor)
{
    console.log("Ejecutar accion " +accion+ " "+idProveedor+" "+descripcionProveedor);
    if(accion == "Editar")
    {

        https://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +idProveedor+"?")
               
        let url = "hhttps://www.apirestaurant.somee.com/api/Proveedor/Editar/";
        let registro = {
        "idProveedor": idProveedor,
        "descripcionProveedor": descripcionProveedor               
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
        alert("Confirma "+accion+" el registro " +idProveedor+" ?");

        let url = "https://www.apirestaurant.somee.com/api/Proveedor/Eliminar/" +idProveedor;
        console.log("URL: " +url);

        let registro = {
            "idProveedor": idProveedor,
            "descripcionProveedor": descripcionProveedor              
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

        let url = "https://www.apirestaurant.somee.com/api/Proveedor/Guardar/";
        console.log("URL: " +url);

        let registro = {
            "idProveedor": idProveedor,
            "descripcionProveedor": descripcionProveedor              
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
    console.log('cargar grilla proveedores...')
   

    const tabla = document.querySelector('#tabla tbody')

    fetch('https://www.apirestaurant.somee.com/api/Proveedor/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     for (let i = 0; i < data.response.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td data-cell="id Proveedor">${data.response[i].idProveedor}</td>
        <td data-cell="descripcion Proveedor">${data.response[i].descripcionProveedor}</td>        
        <td data-cell="editar"><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idProveedor}', '${data.response[i].descripcionProveedor}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td data-cell="eliminar"><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idProveedor}', '${data.response[i].descripcionProveedor}', 'Eliminar')"><i class="fa fa-trash"></i></a></td>
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