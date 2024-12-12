function modalEditar(idCortesSushi, descripcion, cantidad, precio, accion){
   
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
        document.getElementById("cantidad").value = cantidad; 
        document.getElementById("precio").value = precio;        
        
        
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

function ejecutarAccion(accion, idCortesSushi, descripcion, cantidad, precio)
{
    console.log("Ejecutar accion " +accion+ " "+idCortesSushi+" "+descripcion +" "+ precio+" "+cantidad );
    if(accion == "Editar")
    {

        https://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +idCortesSushi+"?")
               
        let url = "https://www.apirestaurant.somee.com/api/CorteSushi/Editar/";
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

        let url = "https://www.apirestaurant.somee.com/api/CorteSushi/Eliminar/" +idCortesSushi;
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

        let url = "https://www.apirestaurant.somee.com/api/CorteSushi/Guardar/";
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

function buscar(){
   

    var texto = document.getElementById("txtBuscar").value; 
    
    const tabla = document.querySelector('#tabla tbody')
    tabla.innerHTML = '';



    // fetch('https://localhost/LyaSushi_Api_v2/Ingrediente/api/Ingrediente/Get')
    fetch('https://apirestaurant.somee.com/api/CorteSushi/Buscar/' +texto)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

           

            for (let i = 0; i < data.response.length; i++) {
                const fila = document.createElement('tr');
                fila.innerHTML += `
        <td data-cell="idCortesSushi">${data.response[i].idCortesSushi}</td>
        <td data-cell="descripcion">${data.response[i].descripcion}</td>   
        <td data-cell="cantidad">${data.response[i].cantidad}</td>   
        <td data-cell="precio">${data.response[i].precio}</td>    
            
        <td data-cell="editar"><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idCortesSushi}', '${data.response[i].descripcion}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td data-cell="eliminar"><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idCortesSushi}', '${data.response[i].descripcion}', 'Eliminar')"><i class="fa fa-trash"></i></a></td>
        `;
                tabla.appendChild(fila);
            }
        });



}


function cargarGrilla()
{
    console.log('cargar grilla corte sushi...')
   

    const tabla = document.querySelector('#tabla tbody')

    fetch('https://www.apirestaurant.somee.com/api/CorteSushi/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     for (let i = 0; i < data.response.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td data-cell="id cortes sushi">${data.response[i].idCortesSushi}</td>
        <td data-cell="descripcion">${data.response[i].descripcion}</td>                
        <td data-cell="cantidad">${data.response[i].cantidad}</td>        
        <td data-cell="precio">${data.response[i].precio}</td>        
        <td data-cell="editar"><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idCortesSushi}', '${data.response[i].descripcion}',  '${data.response[i].cantidad}', '${data.response[i].precio}','Editar')">  <i class="fa fa-edit"></i></a></td>
        <td data-cell="eliminar"><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idCortesSushi}', '${data.response[i].descripcion}', '${data.response[i].cantidad}', '${data.response[i].precio}','Eliminar')"><i class="fa fa-trash"></i></a></td>
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