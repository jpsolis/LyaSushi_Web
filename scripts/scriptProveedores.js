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

        http://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +idProveedor+"?")
               
        let url = "http://localhost/LyaSushi_Api_v2/Proveedor/api/Proveedor/Edit";
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

        let url = "http://localhost/LyaSushi_Api_v2/Proveedor/api/Proveedor/Delete/" +idProveedor;
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

        let url = "http://localhost/LyaSushi_Api_v2/Proveedor/api/Proveedor/Create";
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
   

    const tabla = document.querySelector('#tablaProveedores tbody')

    fetch('http://localhost/LyaSushi_Api_v2/Proveedor/api/Proveedor/Get')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     data.forEach(element => {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td>${element.idProveedor}</td>
        <td>${element.descripcionProveedor}</td>        
        <td><a href="#" id="btnEditar" onclick="modalEditar('${element.idProveedor}', '${element.descripcionProveedor}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td><a href="#" id="btnEliminar" onclick="modalEditar('${element.idProveedor}', '${element.descripcionProveedor}', 'Eliminar')"><i class="fa fa-trash"></i></a></td>
        `;

        tabla.appendChild(fila);
     });
   
});

cargarMenu();


}

function cargarMenu() {


   
    let contentHTML = '';

    const itemsMenu = document.querySelector('#item-menu');

    fetch('http://localhost/LyaSushi_Api_v2/menu/api/menu/Get')
    .then((response) => response.json())
    .then((data) => {
     console.log("lalala " +data);
      for(let i = 0; i < data.length; i++){

        const row = document.createElement("tr");

        console.log("Descripcion: " +data[i].descripcionMenu)

        contentHTML +=

        `<a href="${data[i].pathMenu}">
            <i class="fas fa-home"></i>
            <p>${data[i].descripcionMenu}</p>
        </a>`;


    }


    itemsMenu.innerHTML = contentHTML;
    

   
     });
     

      
    
    
}