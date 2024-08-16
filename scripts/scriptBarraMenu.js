function cargarBarraMenu() {

    console.log("cargarBarraMenu");

    let contentHTML = '';

    const itemsMenu = document.querySelector('#item-menu');

    let loader = '<div class="loader"></div>';
    document.getElementById('center-screen').innerHTML = loader;


    fetch('https://www.apirestaurant.somee.com/api/Menu/Lista/')
    .then((response) => response.json())
    .then((data) => {
     console.log(data);
      for(let i = 0; i < data.response.length; i++){

        const row = document.createElement("tr");

        console.log("Descripcion: " +data.response[i].descripcionMenu)
        console.log("Path: " +data.response[i].pathMenu)

        contentHTML +=

        `<a href="${data.response[i].pathMenu}">
            <i class="fas fa-home"></i>
            <p>${data.response[i].descripcionMenu}</p>
        </a>`;

    }

    itemsMenu.innerHTML = contentHTML;

    document.getElementById('center-screen').innerHTML = '';    
   
     });
}