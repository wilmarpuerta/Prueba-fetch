
// Inicio de sesion

const email = document.getElementById("email");
const password = document.getElementById("password");
const bntLogin = document.getElementById("btn-login");

email.addEventListener("keyup", () => {
    if (email.value != "") {
        email.classList.add("is-valid");
        email.classList.remove("is-invalid");
    }
    else {
        email.classList.remove("is-valid");
        email.classList.add("is-invalid");
    }
});

password.addEventListener("keyup", () => {
    if (password.value != "") {
        password.classList.add("is-valid");
        password.classList.remove("is-invalid");
    }
    else {
        password.classList.remove("is-valid");
        password.classList.add("is-invalid");
    }
})

bntLogin.addEventListener("click", () => {

    fetch("http://localhost:3000/admins")
        .then(res => res.json())
        .then(data => {

            let adminExistente = data.find(admins => admins.email === email.value || admins.password === password.value);
            if (adminExistente) {
                if (email.value == adminExistente.email && password.value == adminExistente.password) {
                    localStorage.setItem("admin", data.id)
                    location.href = "./admin/index.html";
                }
                else {
                    alert("Correo o contraseña incorrectos")
                }
            } else {
                alert("Credenciales Incorrectas");
            }
        })
})


