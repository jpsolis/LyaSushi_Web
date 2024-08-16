
window.addEventListener("load", function(){
    this.document.querySelector(".popup").style.display = "none";
});


function modalEditar(id, desc, accion) {

    var modal = document.getElementById("myModal");   
    document.getElementById("titulo").innerText = accion + " registro";

    if (accion == "Insertar") {
        document.getElementById('lblIdIngrediente').style.display = 'none';
        document.getElementById('idIngrediente').style.display = 'none';
        document.getElementById("accion").value = "Insertar";
    }
    else {
        document.getElementById("idIngrediente").value = id;
        document.getElementById("descripcion").value = desc;
        document.getElementById("accion").value = accion;
    }

    modal.style.display = "block";

}

function cierreModal() {

    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("cierre")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }    
}

function cierrePopup() {

    var popup = document.querySelector(".popup");  
    popup.style.display = "none";
}

function cierreMensaje() {

    var mensaje = document.querySelector(".mensaje");  
    mensaje.style.display = "none";
    location.reload();
    
}

function ejecutarAccion(accion, id, descripcion) {
    console.log("Ejecutar accion " + accion + " " + id + " " + descripcion);
    if (accion == "Editar") {

        let url = "httpss://www.apirestaurant.somee.com/api/Ingrediente/Editar/";        

        this.document.querySelector(".popup").style.display = "block";

       const boton =  document.querySelector("#btnConfirmar");

        boton.addEventListener("click", function(){
            confirmaCancela(accion,boton.id, id, descripcion);
            cierrePopup();

        });



    }
    else if (accion == "Eliminar") {       


        this.document.querySelector(".popup").style.display = "block";

        const boton =  document.querySelector("#btnConfirmar");



        boton.addEventListener("click", function(){
            confirmaCancela(accion,boton.id, id, descripcion);
            cierrePopup();

        });


     


    }

    else if (accion == "Insertar")  {
        
        this.document.querySelector(".popup").style.display = "block";

        const boton =  document.querySelector("#btnConfirmar");



        boton.addEventListener("click", function(){
            confirmaCancela(accion,boton.id, id, descripcion);
            cierrePopup();

        });


    }
}



function confirmaCancela(accion, idBoton, id, descripcion)
{
    if(idBoton == "btnConfirmar" && accion == "Editar")
    {
        let url = "httpss://www.apirestaurant.somee.com/api/Ingrediente/Editar/";
            
        let registro = {
            "idIngrediente": id,
            "descripcion": descripcion           
        }

        let options = {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(registro),
        }

        fetch(url, options)
            .then(response =>   mensaje("Aviso", "Registro Modificado"))


    }
    if(idBoton=="btnConfirmar" && accion == "Eliminar")
    {


        let url = "httpss://www.apirestaurant.somee.com/api/Ingrediente/Eliminar/" + id;
        console.log("URL: " + url);

        let registro = {
            "idIngrediente": id,
            "descripcion": descripcion           
        }

        let options = {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(registro),
        }

        fetch(url, options)
            .then(response => mensaje("Aviso", "Registro Eliminado"))
        

        // location.reload();
    }


    if(idBoton=="btnConfirmar" && accion == "Insertar")
    {

        let url = "httpss://www.apirestaurant.somee.com/api/Ingrediente/Guardar/";
        console.log("URL: " + url);

        let registro = {
            // "idHandroll": id,
            "descripcion": descripcion           
        }

        let options = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(registro),
        }

        fetch(url, options)
            .then(response => mensaje("Aviso", "Registro Ingresado"))        
    }

    // else{
    //     this.document.querySelector(".popup").style.display = "none";

    // }

}


function mensaje(tipoMensaje, mensaje){
if("Aviso"){   
    const elemento =  this.document.querySelector(".mensaje");
    elemento.querySelector("#tipoMensaje").innerHTML = tipoMensaje;
    elemento.querySelector("#cuerpoMensaje").innerHTML = mensaje;
    elemento.style.display = "block";   
}


}
function cargarGrilla() {
    console.log('cargar grilla ingrediente...')

    const tabla = document.querySelector('#tabla tbody')

    // fetch('https://localhost/LyaSushi_Api_v2/Ingrediente/api/Ingrediente/Get')
    fetch('httpss://www.apirestaurant.somee.com/api/Ingrediente/Lista/')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

            for (let i = 0; i < data.response.length; i++) {
                const fila = document.createElement('tr');
                fila.innerHTML += `
        <td data-cell="idIngrediente">${data.response[i].idIngrediente}</td>
        <td data-cell="descripcion">${data.response[i].descripcion}</td>        
        <td data-cell="editar"><a href="#" id="btnEditar" onclick="modalEditar('${data.response[i].idIngrediente}', '${data.response[i].descripcion}', 'Editar')">  <i class="fa fa-edit"></i></a></td>
        <td data-cell="eliminar"><a href="#" id="btnEliminar" onclick="modalEditar('${data.response[i].idIngrediente}', '${data.response[i].descripcion}', 'Eliminar')"><i class="fa fa-trash"></i></a></td>
        `;
                tabla.appendChild(fila);
            }
        });

    cargarMenu();
    //cargarBarraMenu();
}

function cargarMenu() {

    let contentHTML = '';

    const itemsMenu = document.querySelector('#item-menu');

    // fetch('https://localhost/LyaSushi_Api_v2/menu/api/menu/Get')
    fetch('httpss://www.apirestaurant.somee.com/api/Menu/Lista/')
        .then((response) => response.json())
        .then((data) => {
            console.log("lalala " + data);
            for (let i = 0; i < data.response.length; i++) {

                // const row = document.createElement("tr");

                console.log("Descripcion: " + data.response[i].descripcionMenu )

                contentHTML +=
                    `<a href="${data.response[i].pathMenu}">
                    <i class="fas fa-home"></i>
                    <p>${data.response[i].descripcionMenu}</p>
                     </a>`;
            }

            itemsMenu.innerHTML = contentHTML;

        });

}