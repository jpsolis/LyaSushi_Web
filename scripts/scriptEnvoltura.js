function modalEditar(idEnvolturaIngrediente, idIngrediente, descripcionEnvoltura, idEnvoltura,  accion){
   
    var modal = document.getElementById("myModal");
    document.getElementById("titulo").innerText = accion + " registro";

    if(accion == "Insertar")
    {        
        
        
        document.getElementById('lblEnvoltura').style.display = 'none';        
        document.getElementById('idEnvolturaIngrediente').style.display = 'none'; 
        document.getElementById('accion').value = "Insertar";
    }
    else
    {
        document.getElementById("idEnvolturaIngrediente").value = idEnvolturaIngrediente;
        document.getElementById("idIngrediente").value = idIngrediente;
                
        // if(cobroExtra === "true"){
        //     document.getElementById("cobroExtra").setAttribute('checked', 'checked');     
        // }
        // else{
        //    // document.getElementById('cobroExtra').checked = false;      
        //    document.getElementById("cobroExtra").removeAttribute('checked');     
            
        // }

        document.getElementById("descripcionEnvoltura").value = descripcionEnvoltura;        
        document.getElementById("idEnvoltura").value = idEnvoltura;        
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

function ejecutarAccion(accion, idEnvolturaIngrediente, idIngrediente, descripcionEnvoltura, idEnvoltura)
{
    console.log("Ejecutar accion " +accion+ " "+idEnvolturaIngrediente+" "+idIngrediente +" "+ descripcionEnvoltura +" "+idEnvoltura );
    if(accion == "Editar")
    {

        http://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +idEnvoltura+"?")
               
        let url = "https://www.apirestaurant.somee.com/api/EnvolturaIngrediente/Editar/";
        let registro = {
            "idEnvolturaIngrediente": idEnvolturaIngrediente,
            "idIngrediente": idIngrediente,
            "descripcionEnvoltura": descripcionEnvoltura,
            "idEnvoltura": idEnvoltura,    
        }

        let options = {
        method: "PUT",
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(registro),
        }


        try{
        fetch(url, options)
        .then(response => console.log(response.status))

        alert("Registro modificado...")

        location.reload();
        }
        catch(error)
        {
            console.log('Ha habido un error', error);
        }
        
       
       
    }
    else if(accion == "Eliminar"){
        alert("Confirma "+accion+" el registro " +idEnvoltura+" ?");

        let url = "https://www.apirestaurant.somee.com/api/EnvolturaIngrediente/Eliminar/" +idEnvolturaIngrediente;
        console.log("URL: " +url);

        let registro = {
            
            "idEnvolturaIngrediente": idEnvolturaIngrediente,
            "idIngrediente": idIngrediente,        
            "descripcionEnvoltura": descripcionEnvoltura,        
            "idEnvoltura": idEnvoltura,      
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


        alert("Cobro extra: " +cobroExtra);

        let url = "https://www.apirestaurant.somee.com/api/EnvolturaIngrediente/Guardar/";
        console.log("URL: " +url);

        let registro = {
           // "idBebestible": idBebestible,
           "idIngrediente": idIngrediente,        
           "descripcionEnvoltura": descripcionEnvoltura,        
           "idEnvoltura": idEnvoltura,                  
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
    console.log('cargar grilla envoltura...')
   

    const tabla = document.querySelector('#tabla tbody')

    fetch('https://www.apirestaurant.somee.com/api/EnvolturaIngrediente/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
     for (let i = 0; i < data.response.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML += `
<<<<<<< HEAD
        <td data-cell="idEnvolturaIngrediente">${data.response[i].idEnvolturaIngrediente}</td>
        <td data-cell="idIngrediente">${data.response[i].idIngrediente}</td>
        <td data-cell="descripcionEnvoltura">${data.response[i].descripcionEnvoltura}</td>
        <td data-cell="idEnvoltura">${data.response[i].idEnvoltura}</td>                   
            
        <td data-cell="editar"><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idEnvolturaIngrediente}', '${data.response[i].idIngrediente}', '${data.response[i].descripcionEnvoltura}', '${data.response[i].idEnvoltura}',  'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td data-cell="eliminar"><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idEnvolturaIngrediente}', '${data.response[i].idIngrediente}', '${data.response[i].descripcionEnvoltura}', '${data.response[i].idEnvoltura}','Eliminar')"><i class="fa fa-trash"></i></a></td>
=======
        <td>${data.response[i].idEnvolturaIngrediente}</td>
        <td>${data.response[i].idIngrediente}</td>
        <td>${data.response[i].descripcionEnvoltura}</td>        
        <td>${data.response[i].idEnvoltura}</td>        
            
        <td><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idEnvolturaIngrediente}', '${data.response[i].idEnvoltura}', '${data.response[i].cobroExtra}', '${data.response[i].valorExtra}',  'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idEnvolturaIngrediente}', '${data.response[i].idEnvoltura}', '${data.response[i].cobroExtra}', '${data.response[i].valorExtra}','Eliminar')"><i class="fa fa-trash"></i></a></td>
>>>>>>> fae2700c7dfa64f49421eab35148afaf9ae10251
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
     for (let i = 0; i < data.response.length; i++) {

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