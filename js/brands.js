
// Variables que se utilizan varias veces

const titleModal = document.getElementById("titleModal");
const modalBody = document.querySelector(".modal-body");
const modalFooter = document.querySelector(".modal-footer");

// Tabla de admins

const tableBrand = document.getElementById("table-brand");

fetch("http://localhost:3000/brands")
    .then(res => res.json())
    .then(data => {
        data.forEach(brand => {

            // Creacion de fila

            const fila = document.createElement("tr");
            fila.name = `${brand.id}`;

            // Creacion de celda del id

            const idCell = document.createElement("td");
            idCell.textContent = `${brand.id}`;
            idCell.classList.add("ID")
            fila.appendChild(idCell);

            // Creacion de celda del logo

            const logoCell = document.createElement("td");
            const logoImg = document.createElement("img");
            logoImg.src = `${brand.logo}`;
            logoImg.style.width = "100px";
            logoCell.appendChild(logoImg);
            fila.appendChild(logoCell);

            // Creacion de celda del name

            const nameCell = document.createElement("td");
            nameCell.textContent = `${brand.name}`;
            nameCell.classList = "name";
            fila.appendChild(nameCell);

            // Creacion de celda del local

            const localCell = document.createElement("td");
            localCell.textContent = `${brand.local}`;
            localCell.classList = "local";
            fila.appendChild(localCell);

            // Creacion de celda del piso

            const floorCell = document.createElement("td");
            floorCell.textContent = `${brand.floor}`;
            floorCell.classList = "floor";
            fila.appendChild(floorCell);

            // Creacion de celda del horarios

            const sceduleCell = document.createElement("td");
            sceduleCell.textContent = `${brand.scedule}`;
            fila.appendChild(sceduleCell);

            // Creacion de celda del sitio web

            const emailCell = document.createElement("td");
            emailCell.innerHTML = `<a href="${brand.website}">Sitio web</a>`;
            fila.appendChild(emailCell);

            // Creacion de celda de acciones

            const acctionCell = document.createElement("td");
            fila.appendChild(acctionCell);


            // BTN detalles
            const detalles = document.createElement("button");
            detalles.textContent = "Detalles";
            detalles.name = `${brand.id}`;
            detalles.setAttribute("data-bs-toggle", "modal");
            detalles.setAttribute("data-bs-target", "#Modal-detalles")
            detalles.setAttribute("onclick", "detallesBrand(this)");
            detalles.classList.add("btn", "btn-sm", "btn-info")
            acctionCell.appendChild(detalles);

            // BTN editar
            const editar = document.createElement("button");
            editar.textContent = "Editar";
            editar.name = `${brand.id}`;
            editar.setAttribute("data-bs-toggle", "modal");
            editar.setAttribute("data-bs-target", "#Modal-detalles")
            editar.setAttribute("onclick", "editarAdmin(this)");
            editar.classList.add("btn", "btn-sm", "btn-warning")
            acctionCell.appendChild(editar);

            // BTN eliminar
            const remove = document.createElement("button");
            remove.textContent = "Eliminar";
            remove.name = `${brand.id}`;
            remove.setAttribute("onclick", "deleteBrand(this)");
            remove.classList.add("btn", "btn-sm", "btn-danger")
            acctionCell.appendChild(remove);

            tableBrand.appendChild(fila);
        });
    })

// Funcion para eliminar brands

function deleteBrand(element) {
    const id = element.name;

    const confimacion = confirm("Esta seguro de eliminar este Brand");

    if (confimacion) {
        fetch(`http://localhost:3000/brands/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "aplication/json"
            }
        })
    }
}

// Funcion para ver los detalles

function detallesBrand(element) {
    const id = element.name;

    fetch(`http://localhost:3000/brands/${id}`)
        .then(res => res.json())
        .then(data => {
            titleModal.textContent = "Informacion de la Brand";
            modalBody.innerHTML = `
                <h5>ID: ${data.id}</h5>
                <p>Logo: ${data.logo}</p>
                <p>Nombre: ${data.name}</p>
                <p>Local: ${data.local}</p>
                <p>Piso: ${data.floor}</p>
                <p>Horarios: ${data.scedule}</p>
                <p>SITIO WEB: ${data.website}</p>`;
            modalFooter.innerHTML = `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>`;
        })
}

// Funcion para editar brand
function editarAdmin(element) {
    const id = element.name;

    fetch(`http://localhost:3000/brands/${id}`)
        .then(res => res.json())
        .then(data => {
            titleModal.textContent = "Editar Brand";
            modalBody.innerHTML = `
        <label for="">URL del Logo</label>
        <input id="logo" type="text" class="form-control" value="${data.logo}">
        <label for="">Nombre</label>
        <input id="name" type="text" class="form-control" value="${data.name}">
        <label for="">Local</label>
        <input id="local" type="text" class="form-control" value="${data.local}">
        <label for="">Piso</label>
        <input id="piso" type="text" class="form-control" value="${data.floor}">
        <label for="">Horarios</label>
        <input id="horarios" type="text" class="form-control" value="${data.scedule}">
        <label for="">Pagina web</label>
        <input id="website" type="text" class="form-control" value="${data.website}">`
            modalFooter.innerHTML = `
        <button name="${data.id}" type="button" class="btn btn-primary" onclick="editaBrands(this)">Guardar cambios</button>`
        })
}

// Funcion de boton de editar

function editaBrands(element) {
    // Datos 
    const id = element.name;
    const inputLogo = document.getElementById("logo");
    const inputNombre = document.getElementById("name");
    const inputLocal = document.getElementById("local");
    const inputPiso = document.getElementById("piso");
    const inputHorarios = document.getElementById("horarios");
    const inputSitioWeb = document.getElementById("website");


    if (inputLogo.value == "" || inputNombre.value == "" || inputLocal.value == "" || inputPiso.value == "" || inputHorarios.value == "" || inputSitioWeb.value == "") {
        alert("No dejes campos vacios")
    } else {
        fetch(`http://localhost:3000/brands/${id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "aplication/json"
            },
            body: JSON.stringify({ logo: inputLogo.value, name: inputNombre.value, local: inputLocal.value, floor: inputPiso.value, scedule: inputHorarios.value, website: inputSitioWeb.value }),
        })
    }

}


// Funcion para crear un Admin 

function crearBrandModal() {

    titleModal.textContent = "Crear Brand";
    modalBody.innerHTML = `
        <label for="">ULR del logo</label>
        <input id="logo" type="text" class="form-control">
        <label for="">Nombre de la Brand</label>
        <input id="brand" type="text" class="form-control">
        <label for="">Local</label>
        <input id="local" type="text" class="form-control">
        <label for="">Piso</label>
        <input id="piso" type="text" class="form-control">
        <label for="">Horarios</label>
        <input id="horarios" type="text" class="form-control">
        <label for="">Pagina web</label>
        <input id="website" type="text" class="form-control">`
    modalFooter.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" onclick="crearBrand()">Crear Brand</button>`
}

// Funcion de boton de crear Brand

function crearBrand() {
    // Datos 
    const inputLogo = document.getElementById("logo");
    const inputBrand = document.getElementById("brand");
    const inputLocal = document.getElementById("local");
    const inputPiso = document.getElementById("piso");
    const inputHorarios = document.getElementById("horarios");
    const inputWebsite = document.getElementById("website");


    fetch('http://localhost:3000/brands')
        .then(res => res.json())
        .then(data => {
            if (inputLogo.value == "" || inputBrand.value == "" || inputLocal.value == "" || inputPiso.value == "" || inputHorarios.value == "" || inputWebsite.value == "") {
                alert("No dejes campos vacios")
            } else {
                let brandExistente = data.find(brands => brands.name == inputBrand.value);
                if (brandExistente) {
                    alert("El brand ya existe en la base de datos")
                }
                else {
                    fetch(`http://localhost:3000/brands`, {
                        method: 'POST',
                        headers: {
                            "Content-type": "aplication/json"
                        },
                        body: JSON.stringify({ logo: inputLogo.value, name: inputBrand.value, local: inputLocal.value, floor: inputPiso.value, scedule: inputHorarios.value, website: inputWebsite.value }),
                    })
                }
            }
        })
}
