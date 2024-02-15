
// Variables que se utilizan varias veces

const titleModal = document.getElementById("titleModal");
const modalBody = document.querySelector(".modal-body");
const modalFooter = document.querySelector(".modal-footer");

// Tabla de admins

const tableAdmins = document.getElementById("table-admins");

fetch("http://localhost:3000/admins")
    .then(res => res.json())
    .then(data => {
        data.forEach(admin => {

            // Creacion de fila

            const fila = document.createElement("tr");
            fila.name = `${admin.id}`;

            // Creacion de celda del id

            const idCell = document.createElement("td");
            idCell.textContent = `${admin.id}`;
            idCell.classList.add("ID");
            fila.appendChild(idCell);

            // Creacion de celda del name

            const nameCell = document.createElement("td");
            nameCell.textContent = `${admin.name}`;
            nameCell.classList.add("name")
            fila.appendChild(nameCell);

            // Creacion de celda del correo

            const emailCell = document.createElement("td");
            emailCell.textContent = `${admin.email}`;
            emailCell.classList.add("email");
            fila.appendChild(emailCell);

            // Creacion de celda de acciones
            const acctionCell = document.createElement("td");
            fila.appendChild(acctionCell);


            // BTN detalles
            const detalles = document.createElement("button");
            detalles.textContent = "Detalles";
            detalles.name = `${admin.id}`;
            detalles.setAttribute("data-bs-toggle", "modal");
            detalles.setAttribute("data-bs-target", "#Modal-detalles")
            detalles.setAttribute("onclick", "detallesAdmin(this)");
            detalles.classList.add("btn", "btn-sm", "btn-info")
            acctionCell.appendChild(detalles);

            // BTN editar
            const editar = document.createElement("button");
            editar.textContent = "Editar";
            editar.name = `${admin.id}`;
            editar.setAttribute("data-bs-toggle", "modal");
            editar.setAttribute("data-bs-target", "#Modal-detalles")
            editar.setAttribute("onclick", "editarAdmin(this)");
            editar.classList.add("btn", "btn-sm", "btn-warning")
            acctionCell.appendChild(editar);

            // BTN eliminar
            const remove = document.createElement("button");
            remove.textContent = "Eliminar";
            remove.name = `${admin.id}`;
            remove.setAttribute("onclick", "deleteAdmin(this)");
            remove.classList.add("btn", "btn-sm", "btn-danger")
            acctionCell.appendChild(remove);

            tableAdmins.appendChild(fila);
        });
    })

// Funcion para eliminar admins

function deleteAdmin(element) {
    const id = element.name;

    const confimacion = confirm("Esta seguro de eliminar este Admin");

    if (confimacion) {
        fetch(`http://localhost:3000/admins/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "aplication/json"
            }
        })
    }
}

// Funcion para ver los detalles

function detallesAdmin(element) {
    const id = element.name;

    fetch(`http://localhost:3000/admins/${id}`)
        .then(res => res.json())
        .then(data => {
            titleModal.textContent = "Informacion del Admin";
            modalBody.innerHTML = `
                <h5>ID: ${data.id}</h5>
                <p>Nombre: ${data.name}</p>
                <p>Email: ${data.email}</p>
                <p>Password: ${data.password}</p>`;
            modalFooter.innerHTML = `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>`;
        })
}

// Funcion para editar admin

function editarAdmin(element) {
    const id = element.name;

    fetch(`http://localhost:3000/admins/${id}`)
        .then(res => res.json())
        .then(data => {
            titleModal.textContent = "Editar Admin";
            modalBody.innerHTML = `
        <label for="">Nombre completo</label>
        <input id="name" type="text" class="form-control" value="${data.name}">
        <label for="">Correo electronico</label>
        <input id="email" type="text" class="form-control" value="${data.email}">`
            modalFooter.innerHTML = `
        <button name="${data.id}" type="button" class="btn btn-primary" onclick="saveChanges(this)">Guardar cambios</button>`
        })
}

// Funcion de boton de editar

function saveChanges(element) {
    // Datos 
    const id = element.name;
    const inputName = document.getElementById("name");
    const inputEmail = document.getElementById("email");
    const password = Math.random().toString(32).substring(7);

    fetch('http://localhost:3000/admins')
        .then(res => res.json())
        .then(data => {
            if (inputName.value == "" || inputEmail.value == "") {
                alert("No dejes campos vacios")
            } else {
                let brandExistente = data.find(admins => admins.email == inputEmail.value);
                if (brandExistente) {
                    alert("El correo del admin ya existe en la base de datos")
                }
                else {
                    fetch(`http://localhost:3000/admins/${id}`, {
                        method: 'PUT',
                        headers: {
                            "Content-type": "aplication/json"
                        },
                        body: JSON.stringify({ name: inputName.value, email: inputEmail.value, password: password }),
                    })

                }
            }
        })
}


// Funcion para crear un Admin 

function crearAdminModal() {

    titleModal.textContent = "Crear Administrador";
    modalBody.innerHTML = `
        <label for="">Nombre completo</label>
        <input id="name" type="text" class="form-control">
        <label for="">Correo electronico</label>
        <input id="email" type="text" class="form-control">`
    modalFooter.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" onclick="crearAdmin()">Crear Admin</button>`
}

// Funcion de boton de crear Admin

function crearAdmin() {
    // Datos 
    const inputName = document.getElementById("name");
    const inputEmail = document.getElementById("email");
    const password = Math.random().toString(32).substring(7);

    fetch('http://localhost:3000/admins')
        .then(res => res.json())
        .then(data => {
            if (inputName.value == "" || inputEmail.value == "") {
                alert("No dejes campos vacios")
            } else {
                let correoExistente = data.find(admins => admins.email === inputEmail.value);
                if (correoExistente) {
                    alert("El correo ya existe en la base de datos")
                }
                else {
                    fetch(`http://localhost:3000/admins`, {
                        method: 'POST',
                        headers: {
                            "Content-type": "aplication/json"
                        },
                        body: JSON.stringify({ name: inputName.value, email: inputEmail.value, password: password }),
                    })
                }
            }
        })


}