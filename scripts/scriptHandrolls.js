function modalEditar(id, desc, prec, accion){
   
    var modal = document.getElementById("myModal");
    document.getElementById("titulo").innerText = accion + " registro";

    if(accion == "Insertar")
    {        
        
        
        document.getElementById('lblHandroll').style.display = 'none';        
        document.getElementById('idHandroll').style.display = 'none'; 
        document.getElementById('accion').value = "Insertar";
    }
    else{
        document.getElementById("idHandroll").value = id;
        document.getElementById("descripcion").value = desc;
        document.getElementById("precio").value = prec;
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

function ejecutarAccion(accion, id, descripcion, precio)
{
    console.log("Ejecutar accion " +accion+ " "+id+" "+descripcion+" "+precio);
    if(accion == "Editar")
    {

        http://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +id+"?")
               
        let url = "http://localhost/LyaSushi_Api_v2/Handroll/api/Handroll/Edit";
        let registro = {
        "idHandroll": id,
        "descripcion": descripcion,
        "precio": precio,
        "tabHandrollIngredientes": []
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
        alert("Confirma "+accion+" el registro " +id+" ?");

        let url = "http://localhost/LyaSushi_Api_v2/Handroll/api/Handroll/Delete/" +id;
        console.log("URL: " +url);

        let registro = {
         "idHandroll": id,
         "descripcion": descripcion,
         "precio": precio,
         "tabHandrollIngredientes": []
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

        let url = "http://localhost/LyaSushi_Api_v2/Handroll/api/Handroll/Create";
        console.log("URL: " +url);

        let registro = {
        // "idHandroll": id,
         "descripcion": descripcion,
         "precio": precio,
         "tabHandrollIngredientes": []
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
    console.log('cargar grilla handroll...')
   

    const tabla = document.querySelector('#tablaHandroll tbody')

    fetch('http://localhost/LyaSushi_Api_v2/Handroll/api/Handroll/Get')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     data.forEach(element => {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td>${element.idHandroll}</td>
        <td>${element.descripcion}</td>
        <td>${element.precio}</td>
        <td><a href="#" id="btnEditar" onclick="modalEditar('${element.idHandroll}', '${element.descripcion}', '${element.precio}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td><a href="#" id="btnEliminar" onclick="modalEditar('${element.idHandroll}', '${element.descripcion}', '${element.precio}', 'Eliminar')"><i class="fa fa-trash"></i></a></td>
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