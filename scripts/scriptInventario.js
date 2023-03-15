function modalEditar(codInventario, idProveedor, idIngrediente, iCodUnidad, costoUnitario, cantidad, valorEnInventario, dFechaInventario, accion){
   
alert("Fecha Inventario: "+dFechaInventario )

    var modal = document.getElementById("myModal");
    document.getElementById("titulo").innerText = accion + " registro";

    if(accion == "Insertar")
    {        
        
        
        document.getElementById('lblcodInventario').style.display = 'none';        
        document.getElementById('codInventario').style.display = 'none'; 
        document.getElementById('accion').value = "Insertar";
    }
    else{
        document.getElementById("codInventario").value = codInventario;
        document.getElementById("idProveedor").value = idProveedor;        
        document.getElementById("idIngrediente").value = idIngrediente;        
        document.getElementById("iCodUnidad").value = iCodUnidad;        
        document.getElementById("costoUnitario").value = costoUnitario;        
        document.getElementById("cantidad").value = cantidad;        
        document.getElementById("valorEnInventario").value = valorEnInventario;  
        
        document.getElementById("dFechaInventario").value = dFechaInventario;        
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

function ejecutarAccion(accion, codInventario, idProveedor, idIngrediente, iCodUnidad, costoUnitario, valorEnInventario, dFechaInventario)
{
    console.log("Ejecutar prueba " +dFechaInventario);
    if(accion == "Editar")
    {

        http://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +codInventario+"?")
               
        let url = "http://localhost/LyaSushi_Api_v2/InventarioIngrediente/api/InventarioIngrediente/Edit";
        let registro = {
        "codInventario": codInventario,
        "idProveedor": idProveedor,
        "idIngrediente": idIngrediente,
        "iCodUnidad": iCodUnidad,
        "costoUnitario": costoUnitario,
        "valorEnInventario": valorEnInventario,
        "dFechaInventario": dFechaInventario,

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
        alert("Confirma "+accion+" el registro " +codInventario+" ?");

        let url = "http://localhost/LyaSushi_Api_v2/InventarioIngrediente/api/InventarioIngrediente/Delete/" +codInventario;
        console.log("URL: " +url);

        let registro = {
            "codInventario": codInventario,
            "idProveedor": idProveedor,
            "idIngrediente": idIngrediente,
            "iCodUnidad": iCodUnidad,
            "costoUnitario": costoUnitario,
            "valorEnInventario": valorEnInventario,
            "dFechaInventario": dFechaInventario,            
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

        let url = "http://localhost/LyaSushi_Api_v2/InventarioIngrediente/api/InventarioIngrediente/Create";
        //let url = "https://localhost:7042/InventarioIngrediente/api/InventarioIngrediente/Create";
        console.log("URL: " +url);


        var inputFecha =  document.getElementById("dFechaInventario").value;
        var inputCantidad =  document.getElementById("cantidad").value;

        //var fechaIngresada = dateFormat(new Date(inputFecha).toISOString;

        

        let registro = {
          //  "codInventario": codInventario,
            "idProveedor": Number(idProveedor),
            "idIngrediente": Number(idIngrediente),
            "iCodUnidad": Number(iCodUnidad),
            "costoUnitario": Number(costoUnitario),
            "cantidad":  inputCantidad,
            "valorEnInventario": Number(valorEnInventario),
            "dFechaInventario": inputFecha
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
       .catch(error => console.error(error));
       
       
       alert("Registro ingresado...")

       location.reload();

    }
}


function cargarGrilla()
{
    console.log('cargar grilla inventario...')   

    const tabla = document.querySelector('#tablaInventario tbody')

    fetch('http://localhost/LyaSushi_Api_v2/InventarioIngrediente/api/InventarioIngrediente/Get')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     data.forEach(element => {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td>${element.codInventario}</td>
        <td>${element.idProveedor}</td>        
        <td>${element.idIngrediente}</td>        
        <td>${element.iCodUnidad}</td>        
        <td>${element.costoUnitario}</td>        
        <td>${element.cantidad}</td>        
        <td>${element.valorEnInventario}</td>        
        <td>${element.dFechaInventario}</td>        
        <td><a href="#" id="btnEditar" onclick="modalEditar('${element.codInventario}', '${element.idProveedor}', '${element.idIngrediente}', '${element.iCodUnidad}','${element.costoUnitario}','${element.cantidad}','${element.valorEnInventario}','${element.dFechaInventario}','Editar')">  <i class="fa fa-edit"></i></a></td>
        <td><a href="#" id="btnEliminar" onclick="modalEditar('${element.codInventario}', '${element.idProveedor}', '${element.idIngrediente}', '${element.iCodUnidad}','${element.costoUnitario}','${element.cantidad}','${element.valorEnInventario}','${element.dFechaInventario}','Eliminar')"><i class="fa fa-trash"></i></a></td>
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