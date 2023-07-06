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
               
        let url = "https://www.apirestaurant.somee.com/api/Handroll/Editar/";
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

        let url = "https://www.apirestaurant.somee.com/api/Handroll/Eliminar/" +id;
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

        let url = "https://www.apirestaurant.somee.com/api/Handroll/Guardar/";
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
   

    const tabla = document.querySelector('#tabla tbody')

    fetch('https://www.apirestaurant.somee.com/api/Handroll/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     for (let i = 0; i < data.response.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td data-cell="idHandroll">${data.response[i].idHandroll}</td>
        <td data-cell="descripcion">${data.response[i].descripcion}</td>
        <td data-cell="precio">${data.response[i].precio}</td>
        <td data-cell="editar"><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idHandroll}', '${data.response[i].descripcion}', '${data.response[i].precio}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td data-cell="eliminar"><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idHandroll}', '${data.response[i].descripcion}', '${data.response[i].precio}', 'Eliminar')"><i class="fa fa-trash"></i></a></td>
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