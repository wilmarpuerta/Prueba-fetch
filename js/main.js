
// Funcion para comprobar si esta registrado

const user = localStorage.getItem("admin")
if (!user) {
    location.href = "../index.html"
}

// Funcion de cambio de nombre por admin

let nameAdmin = document.getElementById("nameAdmin");

fetch(`http://localhost:3000/admins/${localStorage.admin}`)
    .then(res => res.json())
    .then(data => {
        nameAdmin.textContent = data.name;
    })

// Funcion de cerrar sesion

let cerrarSesion = document.getElementById("cerrarSesion");

cerrarSesion.addEventListener("click", () => {
    localStorage.clear();
    let ruta = window.location.pathname;
    if (ruta == "/admin/admins/index.html" || ruta == "/admin/brands/index.html" || ruta == "/admin/pqrs/index.html") {
        location.href = "../../index.html"
    } else {
        location.href = "../index.html"
    }
})



// Funcion para cambiar la cantidad de registros
function cantidadRegistro(url, category) {
    const idCant = document.getElementById(`${category}`)

    fetch(`http://localhost:3000/${url}`)
        .then(res => res.json())
        .then(data => {
            idCant.textContent = data.length;
        })
}
cantidadRegistro("admins", "cantAdministradores");
cantidadRegistro("brands", "cantMarcas");
cantidadRegistro("pqrs", "cantPQRS");

// Funcion de los buscadores

// Buscador por id
document.addEventListener('keyup', e => {
    if (e.target.matches('#searchId')) {
        document.querySelectorAll('.ID').forEach(id => {
            id.textContent.toLowerCase().includes(e.target.value)
                ? id.parentElement.style = "display: table-row;"
                : id.parentElement.style = "display: none;"
        })
    }
});

// Buscador por name
document.addEventListener('keyup', e => {
    if (e.target.matches('#searchName')) {
        document.querySelectorAll('.name').forEach(name => {
            name.textContent.toLowerCase().includes(e.target.value)
                ? name.parentElement.style = "display: table-row;"
                : name.parentElement.style = "display: none;"
        })
    }
});

// Buscador por email
document.addEventListener('keyup', e => {
    if (e.target.matches('#searchEmail')) {
        document.querySelectorAll('.email').forEach(email => {
            email.textContent.toLowerCase().includes(e.target.value)
                ? email.parentElement.style = "display: table-row;"
                : email.parentElement.style = "display: none;"
        })
    }
});

// Buscador por local
document.addEventListener('keyup', e => {
    if (e.target.matches('#searchLocal')) {
        document.querySelectorAll('.local').forEach(local => {
            local.textContent.toLowerCase().includes(e.target.value)
                ? local.parentElement.style = "display: table-row;"
                : local.parentElement.style = "display: none;"
        })
    }
});

// Buscador por piso
document.addEventListener('keyup', e => {
    if (e.target.matches('#searchFloor')) {
        document.querySelectorAll('.floor').forEach(floor => {
            floor.textContent.toLowerCase().includes(e.target.value)
                ? floor.parentElement.style = "display: table-row;"
                : floor.parentElement.style = "display: none;"
        })
    }
});

// Buscador por mensaje
document.addEventListener('keyup', e => {
    if (e.target.matches('#searchMessage')) {
        document.querySelectorAll('.message').forEach(message => {
            message.textContent.toLowerCase().includes(e.target.value)
                ? message.parentElement.style = "display: table-row;"
                : message.parentElement.style = "display: none;"
        })
    }
});

// Buscador por tipo
document.addEventListener('change', e => {
    if (e.target.matches('#selectType')) {
        const selectedType = e.target.value.toLowerCase();
        document.querySelectorAll('.tipo').forEach(tipo => {
            tipo.textContent.toLowerCase().includes(selectedType)
                ? tipo.parentElement.style.display = 'table-row'
                : tipo.parentElement.style.display = 'none'
        });
    }
});
