function modalEditar(idRelleno, descripcion, cobroExtra, valorExtra, codigoRelleno, accion){
   
    var modal = document.getElementById("myModal");
    document.getElementById("titulo").innerText = accion + " registro";

    if(accion == "Insertar")
    {        
        
        
        document.getElementById('lblidRelleno').style.display = 'none';        
        document.getElementById('idRelleno').style.display = 'none'; 
        document.getElementById('accion').value = "Insertar";
    }
    else{
        document.getElementById("idRelleno").value = idRelleno;
        document.getElementById("descripcion").value = descripcion;   
        
        if(cobroExtra === "true"){
            document.getElementById("cobroExtra").setAttribute('checked', 'checked');     
        }
        else{
           // document.getElementById('cobroExtra').checked = false;      
           document.getElementById("cobroExtra").removeAttribute('checked');     
            
        }

       
        document.getElementById("valorExtra").value = valorExtra;        
        document.getElementById("codigoRelleno").value = codigoRelleno;        
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

function ejecutarAccion(accion, idRelleno, descripcion, cobroExtra, valorExtra, codigoRelleno)
{
    console.log("Ejecutar accion " +accion+ " "+idRelleno+" "+descripcion +" "+ cobroExtra +" "+valorExtra+" "+codigoRelleno );
    if(accion == "Editar")
    {

        http://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +idRelleno+"?")
               
        let url = "https://www.apirestaurant.somee.com/api/Relleno/Editar/";
        let registro = {
        "idRelleno": idRelleno,
        "descripcion": descripcion,        
        "cobroExtra": cobroExtra,        
        "valorExtra": valorExtra,        
        "codigoRelleno": codigoRelleno       
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
        alert("Confirma "+accion+" el registro " +idRelleno+" ?");

        let url = "https://www.apirestaurant.somee.com/api/Relleno/Eliminar/" +idRelleno;
        console.log("URL: " +url);

        let registro = {
        "idRelleno": idRelleno,
        "descripcion": descripcion,        
        "cobroExtra": cobroExtra,        
        "valorExtra": valorExtra,        
        "codigoRelleno": codigoRelleno   
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

        let url = "https://www.apirestaurant.somee.com/api/Relleno/Guardar/";
        console.log("URL: " +url);

        let registro = {
           // "idBebestible": idBebestible,
            "descripcion": descripcion,        
            "cobroExtra": cobroExtra,        
            "valorExtra": valorExtra,        
            "codigoRelleno": codigoRelleno    
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
    console.log('cargar grilla rellenos...')
   

    const tabla = document.querySelector('#tablaRellenos tbody')

    fetch('https://www.apirestaurant.somee.com/api/Relleno/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     for(let i = 0; i < data.response.length; i++){
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td>${data.response[i].idRelleno}</td>
        <td>${data.response[i].descripcion}</td>        
        <td>${data.response[i].cobroExtra}</td>        
        <td>${data.response[i].valorExtra}</td>        
        <td>${data.response[i].codigoRelleno}</td>        
        <td><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idRelleno}', '${data.response[i].descripcion}', '${data.response[i].cobroExtra}', '${data.response[i].valorExtra}', '${data.response[i].codigoRelleno}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idRelleno}', '${data.response[i].descripcion}', '${data.response[i].cobroExtra}', '${data.response[i].valorExtra}', '${data.response[i].codigoRelleno}','Eliminar')"><i class="fa fa-trash"></i></a></td>
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