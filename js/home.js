
// Consumo de las brands de la API

fetch("http://localhost:3000/brands")
    .then(res => res.json())
    .then(data => {
        data.forEach(brand => {

            // Creacion de card
            const row = document.querySelector(".row");
            const card = document.createElement("div");
            card.classList.add("col-md-6", "col-lg-3", "d-flex", "align-items-stretch", "mb-3");
            card.innerHTML = `
            <div class="icon-box flex-column card h-100" data-aos="fade-up" data-aos-delay="100">
                <img src="${brand.logo}" class="img-fluid"
                alt="">
                <h4 class="title name"><a href="">${brand.name}</a></h4>
                <p class="description">${brand.scedule}</p>
                <br>
                <button class="btn btn-primary w-100 mt-auto btn-sm"><a class="link-light" href="${brand.website}">Detalles</a></button>
            </div>`
            row.appendChild(card);
        });
    })

// Buscador

document.addEventListener('keyup', e => {
    if (e.target.matches('#searchName')) {
        document.querySelectorAll('.name').forEach(name => {
            let father = (name.parentElement).parentElement;
            name.textContent.toLowerCase().includes(e.target.value)
                ? father.style = "display: flex !important;"
                : father.style = "display: none !important;"
        })
    }
});