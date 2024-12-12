function modalEditar(idMenu, descripcionMenu, pathMenu, accion){
   
    var modal = document.getElementById("myModal");
    document.getElementById("titulo").innerText = accion + " registro";

    if(accion == "Insertar")
    {   
        document.getElementById('lblidMenu').style.display = 'none';        
        document.getElementById('idMenu').style.display = 'none'; 
        document.getElementById('accion').value = "Insertar";
    }
    else{
        document.getElementById("idMenu").value = idMenu;
        document.getElementById("descripcionMenu").value = descripcionMenu;        
        document.getElementById("pathMenu").value = pathMenu;        
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

function buscar(){
   

    var texto = document.getElementById("txtBuscar").value; 
    
    const tabla = document.querySelector('#tabla tbody')
    tabla.innerHTML = '';



    // fetch('https://localhost/LyaSushi_Api_v2/Ingrediente/api/Ingrediente/Get')
    fetch('https://apirestaurant.somee.com/api/Menu/Buscar/' +texto)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

           

            for (let i = 0; i < data.response.length; i++) {
                const fila = document.createElement('tr');
                fila.innerHTML += `
        <td data-cell="idMenu">${data.response[i].idMenu}</td>
        <td data-cell="descripcionMenu">${data.response[i].descripcionMenu}</td>           
        <td data-cell="editar"><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idMenu}', '${data.response[i].descripcionMenu}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td data-cell="eliminar"><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idMenu}', '${data.response[i].descripcionMenu}', 'Eliminar')"><i class="fa fa-trash"></i></a></td>
        `;
                tabla.appendChild(fila);
            }
        });



}

function ejecutarAccion(accion, idMenu, descripcionMenu, pathMenu)
{
    console.log("Ejecutar accion " +accion+ " "+idMenu+" "+descripcionMenu, +"" + pathMenu);
    if(accion == "Editar")
    {

        https://localhost/LyaSushi_Api_v2/handroll/api/handroll/Edit

        alert("Confirma "+accion+" el registro " +idMenu+"?")
               
        let url = "https://www.apirestaurant.somee.com/api/Menu/Editar/";
        let registro = {
        "idMenu": idMenu,
        "descripcionMenu": descripcionMenu,
        "pathMenu": pathMenu
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
        alert("Confirma "+accion+" el registro " +idMenu+" ?");

        let url = "https://www.apirestaurant.somee.com/api/Menu/Eliminar/" +idMenu;
        console.log("URL: " +url);

        let registro = {
        "idMenu": idMenu,
        "descripcionMenu": descripcionMenu,
        "pathMenu": pathMenu              
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

        let url = "https://www.apirestaurant.somee.com/api/Menu/Guardar/";
        console.log("URL: " +url);

        let registro = {
            //"idProveedor": idMenu,
            "descripcionMenu": descripcionMenu,
            "pathMenu": pathMenu          
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
    console.log('cargar grilla menu...')
   

    const tabla = document.querySelector('#tabla tbody')

    fetch('https://www.apirestaurant.somee.com/api/Menu/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log("blablablaa" +data)
    //  data.forEach(element => {
    //     const fila = document.createElement('tr');
    //     fila.innerHTML += `
    //     <td>${element.idMenu}</td>
    //     <td>${element.descripcionMenu}</td>        
    //     <td>${element.pathMenu}</td>        
    //     <td><a href="#" id="btnEditar" onclick="modalEditar('${element.idMenu}', '${element.descripcionMenu}', '${element.pathMenu}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
    //     <td><a href="#" id="btnEliminar" onclick="modalEditar('${element.idMenu}', '${element.descripcionMenu}', '${element.pathMenu}', 'Eliminar')"><i class="fa fa-trash"></i></a></td>
    //     `;

    //     tabla.appendChild(fila);
    //  });
    for (let i = 0; i < data.response.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML += `
<td>${data.response[i].idMenu}</td>
<td>${data.response[i].descripcionMenu}</td>        
<td>${data.response[i].pathMenu}</td>        
<td><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idMenu}', '${data.response[i].descripcionMenu}', '${data.response[i].pathMenu}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
<td><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idMenu}', '${data.response[i].descripcionMenu}', '${data.response[i].pathMenu}','Eliminar')"> <i class="fa fa-trash"></i></a></td>
`;
tabla.appendChild(fila);
    }
});

 cargarMenu();



}

function cargarMenu() {



    let contentHTML = '';

    let itemsMenu = '';
    itemsMenu =  document.querySelector('#item-menu');

    console.log("cargar barra de menu...");

    // fetch('https://localhost/LyaSushi_Api_v2/menu/api/menu/Get')
    fetch('https://www.apirestaurant.somee.com/api/Menu/Lista/')
        .then((response) => response.json())
        .then((data) => {
            console.log("lalala " + data);
            for (let i = 0; i < data.response.length; i++) {

                const row = document.createElement("tr");

                console.log("Descripcion: " + data.response[i].descripcionMenu)

                contentHTML +=

                    `<a href="${data.response[i].pathMenu}">
            <i class="fas fa-home"></i>
            <p>${data.response[i].descripcionMenu}</p>
        </a>`;



    }

    itemsMenu.innerHTML = contentHTML;
    
     });
    
}