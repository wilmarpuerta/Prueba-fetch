
// Tabla de pqrs

const tablePqrs = document.getElementById("table-pqrs");

fetch("http://localhost:3000/pqrs")
    .then(res => res.json())
    .then(data => {
        data.forEach(pqrs => {

            // Creacion de fila

            const fila = document.createElement("tr");
            fila.name = `${pqrs.id}`;

            // Creacion de celda del id

            const idCell = document.createElement("td");
            idCell.textContent = `${pqrs.id}`;
            idCell.classList.add("ID");
            fila.appendChild(idCell);

            // Creacion de celda del tipo

            const tipoCell = document.createElement("td");
            tipoCell.textContent = `${pqrs.type}`;
            tipoCell.classList.add("tipo");
            fila.appendChild(tipoCell);

            // Creacion de celda del correo

            const emailCell = document.createElement("td");
            emailCell.textContent = `${pqrs.email}`;
            emailCell.classList.add("email");
            fila.appendChild(emailCell);

            // Creacion de celda del mensaje

            const mensajeCell = document.createElement("td");
            mensajeCell.textContent = `${pqrs.mensaje}`;
            mensajeCell.classList.add("message");
            fila.appendChild(mensajeCell);

            // Creacion de celda de acciones

            const acctionCell = document.createElement("td");
            const remove = document.createElement("button");
            remove.textContent = "Eliminar";
            remove.name = `${pqrs.id}`;
            remove.setAttribute("onclick", "deletePqrs(this)");
            remove.classList.add("btn", "btn-sm", "btn-danger")
            acctionCell.appendChild(remove);
            fila.appendChild(acctionCell);

            tablePqrs.appendChild(fila);
        });
    })

// Funcion para eliminar pqrs

function deletePqrs(element) {
    const id = element.name;

    const confimacion = confirm("Esta seguro de eliminar este pqr");

    if (confimacion) {
        fetch(`http://localhost:3000/pqrs/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "aplication/json"
            }
        })
    }

}