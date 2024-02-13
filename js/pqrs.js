
// Creacion de pqrs

const type = document.getElementById("form-select");
const email = document.getElementById("email");
const mensaje = document.getElementById("Mensaje");
const btnEnviar = document.getElementById("btn-enviar");

btnEnviar.addEventListener("click", ()=>{
    if(type.value == "" || email.value == "" || mensaje.value == ""){
        alert("No dejes campos vacios");
        if(type.value == ""){
            type.classList.add("is-invalid");
        }else{
            type.classList.remove("is-invalid");
        }
        if(email.value == ""){
            email.classList.add("is-invalid");
        }else{
            email.classList.remove("is-invalid");
        }
        if(mensaje.value == ""){
            mensaje.classList.add("is-invalid");
        }else{
            mensaje.classList.remove("is-invalid");
        }
    }
    else{
        fetch(`http://localhost:3000/pqrs`, {
            method: 'POST',
            headers: {
                "Content-type": "aplication/json"
            },
            body: JSON.stringify({ type: type.value, email: email.value, mensaje: mensaje.value }),
        })
            type.value = "";
            email.value = "";
            mensaje.value = "";
    }
})