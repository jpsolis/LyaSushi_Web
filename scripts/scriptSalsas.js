function modalEditar(idSalsa, descripcionSalsa, precioUnitario, precio, cantidad, accion){
   
    var modal = document.getElementById("myModal");
    document.getElementById("titulo").innerText = accion + " registro";

    if(accion == "Insertar")
    {        
        
        
        document.getElementById('lblSalsa').style.display = 'none';        
        document.getElementById('idSalsa').style.display = 'none'; 
        document.getElementById('accion').value = "Insertar";
    }
    else{
        document.getElementById("idSalsa").value = idSalsa;
        document.getElementById("descripcionSalsa").value = descripcionSalsa;        
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

function ejecutarAccion(accion, idSalsa, descripcionSalsa, precioUnitario, precio, cantidad)
{
    console.log("Ejecutar accion " +accion+ " "+idSalsa+" "+descripcionSalsa +" "+ precioUnitario +" "+precio+" "+cantidad );
    if(accion == "Editar")
    {

        http://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +idSalsa+"?")
               
        let url = "http://localhost/LyaSushi_Api_v2/Salsa/api/Salsa/Edit";
        let registro = {
        "idSalsa": idSalsa,
        "descripcionSalsa": descripcionSalsa,        
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
        alert("Confirma "+accion+" el registro " +idSalsa+" ?");

        let url = "http://localhost/LyaSushi_Api_v2/Salsa/api/Salsa/Delete/" +idSalsa;
        console.log("URL: " +url);

        let registro = {
            "idSalsa": idSalsa,
            "descripcionSalsa": descripcionSalsa,        
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

        let url = "http://localhost/LyaSushi_Api_v2/Salsa/api/Salsa/Create";
        console.log("URL: " +url);

        let registro = {
            // "idSalsa": idSalsa,
            "descripcionSalsa": descripcionSalsa,        
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
    console.log('cargar grilla salsas...')
   

    const tabla = document.querySelector('#tablaSalsas tbody')

    fetch('http://localhost/LyaSushi_Api_v2/Salsa/api/Salsa/Get')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     data.forEach(element => {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td>${element.idSalsa}</td>
        <td>${element.descripcionSalsa}</td>        
        <td>${element.precioUnitario}</td>        
        <td>${element.precio}</td>        
        <td>${element.cantidad}</td>        
        <td><a href="#" id="btnEditar" onclick="modalEditar('${element.idSalsa}', '${element.descripcionSalsa}', '${element.precioUnitario}', '${element.precio}', '${element.cantidad}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td><a href="#" id="btnEliminar" onclick="modalEditar('${element.idSalsa}', '${element.descripcionSalsa}', '${element.precioUnitario}', '${element.precio}', '${element.cantidad}','Eliminar')"><i class="fa fa-trash"></i></a></td>
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