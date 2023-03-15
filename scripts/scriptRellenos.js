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
               
        let url = "http://localhost/LyaSushi_Api_v2/Relleno/api/Relleno/Edit";
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

        let url = "http://localhost/LyaSushi_Api_v2/Relleno/api/Relleno/Delete/" +idRelleno;
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

        let url = "http://localhost/LyaSushi_Api_v2/Relleno/api/Relleno/Create";
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

    fetch('http://localhost/LyaSushi_Api_v2/Relleno/api/Relleno/Get')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     data.forEach(element => {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td>${element.idRelleno}</td>
        <td>${element.descripcion}</td>        
        <td>${element.cobroExtra}</td>        
        <td>${element.valorExtra}</td>        
        <td>${element.codigoRelleno}</td>        
        <td><a href="#" id="btnEditar" onclick="modalEditar('${element.idRelleno}', '${element.descripcion}', '${element.cobroExtra}', '${element.valorExtra}', '${element.codigoRelleno}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td><a href="#" id="btnEliminar" onclick="modalEditar('${element.idRelleno}', '${element.descripcion}', '${element.cobroExtra}', '${element.valorExtra}', '${element.codigoRelleno}','Eliminar')"><i class="fa fa-trash"></i></a></td>
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