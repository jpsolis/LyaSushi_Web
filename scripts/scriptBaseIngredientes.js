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

        http://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +idBaseIngrediente+"?")
               
        let url = "http://localhost/LyaSushi_Api_v2/BaseIngrediente/api/BaseIngrediente/Edit";
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

        let url = "http://localhost/LyaSushi_Api_v2/BaseIngrediente/api/BaseIngrediente/Delete/" +idBaseIngrediente;
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

        let url = "http://localhost/LyaSushi_Api_v2/BaseIngrediente/api/BaseIngrediente/Create";
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


function cargarGrilla()
{
    console.log('cargar grilla base ingrediente...')
   

    const tabla = document.querySelector('#tablaBaseIngredientes tbody')

    fetch('http://localhost/LyaSushi_Api_v2/BaseIngrediente/api/BaseIngrediente/Get')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     data.forEach(element => {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td>${element.idBaseIngrediente}</td>
        <td>${element.idIngrediente}</td>        
        <td>${element.descripcionBase}</td>        
        <td>${element.idBase}</td>        
        <td>${element.idUnidad}</td>        
        <td>${element.cantidad}</td> 
        <td><a href="#" id="btnEditar" onclick="modalEditar('${element.idBaseIngrediente}', '${element.idIngrediente}', '${element.descripcionBase}', '${element.idBase}', '${element.idUnidad}', '${element.cantidad}','Editar')">  <i class="fa fa-edit"></i></a></td>
        <td><a href="#" id="btnEliminar" onclick="modalEditar('${element.idBaseIngrediente}', '${element.idIngrediente}', '${element.descripcionBase}', '${element.idBase}', '${element.idUnidad}','${element.cantidad}','Eliminar')"><i class="fa fa-trash"></i></a></td>
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

        console.log("Descripcion: " +data[i].descripcion)

        contentHTML +=

        `<a href="${data[i].pathMenu}">
            <i class="fas fa-home"></i>
            <p>${data[i].descripcionMenu}</p>
        </a>`;


    }


    itemsMenu.innerHTML = contentHTML;
    

   
     });
     

      
    
    
}