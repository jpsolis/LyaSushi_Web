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
               
        let url = "ttps://www.apirestaurant.somee.com/api/Inventario/Editar/";
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
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
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

        let url = "ttps://www.apirestaurant.somee.com/api/Inventario/Eliminar/" +codInventario;
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

        let url = "ttps://www.apirestaurant.somee.com/api/Ingrediente/Guardar/";
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

    const tabla = document.querySelector('#tabla tbody')

    fetch('https://www.apirestaurant.somee.com/api/InventarioIngrediente/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     for (let i = 0; i < data.response.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td data-cell="código inventario">${data.response[i].codInventario}</td>
        <td data-cell="id proveedor">${data.response[i].idProveedor}</td>        
        <td data-cell="id ingrediente">${data.response[i].idIngrediente}</td>        
        <td data-cell="código unidad">${data.response[i].iCodUnidad}</td>        
        <td data-cell="costo unidad">${data.response[i].costoUnitario}</td>        
        <td data-cell="cantidad">${data.response[i].cantidad}</td>        
        <td data-cell="valor en inventario">${data.response[i].valorEnInventario}</td>        
        <td data-cell="fecha inventario">${data.response[i].dFechaInventario}</td>        
        <td data-cell="editar"><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].codInventario}', '${data.response[i].idProveedor}', '${data.response[i].idIngrediente}', '${data.response[i].iCodUnidad}','${data.response[i].costoUnitario}','${data.response[i].cantidad}','${data.response[i].valorEnInventario}','${data.response[i].dFechaInventario}','Editar')">  <i class="fa fa-edit"></i></a></td>
        <td data-cell="eliminar"><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].codInventario}', '${data.response[i].idProveedor}', '${data.response[i].idIngrediente}', '${data.response[i].iCodUnidad}','${data.response[i].costoUnitario}','${data.response[i].cantidad}','${data.response[i].valorEnInventario}','${data.response[i].dFechaInventario}','Eliminar')"><i class="fa fa-trash"></i></a></td>
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