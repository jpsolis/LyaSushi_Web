function modalEditar(idCortesSushi, descripcion, precio, cantidad, accion){
   
    var modal = document.getElementById("myModal");
    document.getElementById("titulo").innerText = accion + " registro";

    if(accion == "Insertar")
    {        
        
        
        document.getElementById('lblidCortesSushi').style.display = 'none';        
        document.getElementById('idCortesSushi').style.display = 'none'; 
        document.getElementById('accion').value = "Insertar";
    }
    else{
        document.getElementById("idCortesSushi").value = idCortesSushi;
        document.getElementById("descripcion").value = descripcion;                
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

function ejecutarAccion(accion, idCortesSushi, descripcion, precio, cantidad)
{
    console.log("Ejecutar accion " +accion+ " "+idCortesSushi+" "+descripcion +" "+ precio+" "+cantidad );
    if(accion == "Editar")
    {

        http://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +idCortesSushi+"?")
               
        let url = "http://localhost/LyaSushi_Api_v2/cortesushi/api/cortesushi/Edit";
        let registro = {
            "idCortesSushi": idCortesSushi,
            "descripcion": descripcion,                  
            "cantidad": cantidad,         
            "precio": precio
            
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
        alert("Confirma "+accion+" el registro " +idCortesSushi+" ?");

        let url = "http://localhost/LyaSushi_Api_v2/cortesushi/api/cortesushi/Delete/" +idCortesSushi;
        console.log("URL: " +url);

        let registro = {
            "idCortesSushi": idCortesSushi,
            "descripcion": descripcion,                  
            "cantidad": cantidad,         
            "precio": precio    
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

        let url = "http://localhost/LyaSushi_Api_v2/cortesushi/api/cortesushi/Create";
        console.log("URL: " +url);

        let registro = {
            "descripcion": descripcion,                  
            "cantidad": cantidad,         
            "precio": precio         
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
    console.log('cargar grilla corte sushi...')
   

    const tabla = document.querySelector('#tablaCorteSushi tbody')

    fetch('http://localhost/LyaSushi_Api_v2/cortesushi/api/cortesushi/Get')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     data.forEach(element => {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td>${element.idCortesSushi}</td>
        <td>${element.descripcion}</td>                
        <td>${element.cantidad}</td>        
        <td>${element.precio}</td>        
        <td><a href="#" id="btnEditar" onclick="modalEditar('${element.idCortesSushi}', '${element.descripcion}',  '${element.cantidad}', '${element.precio}','Editar')">  <i class="fa fa-edit"></i></a></td>
        <td><a href="#" id="btnEliminar" onclick="modalEditar('${element.idCortesSushi}', '${element.descripcion}', '${element.cantidad}', '${element.precio}','Eliminar')"><i class="fa fa-trash"></i></a></td>
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