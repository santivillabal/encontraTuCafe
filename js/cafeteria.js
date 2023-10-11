const cafeteria = JSON.parse(localStorage.getItem("cafeteria"));



// BANNER

const banner = document.getElementById("banner");
banner.innerHTML = `
    <div class="text-center my-4">
        <h2 class="text-white title shadow-lg">${cafeteria.nombre}</h2>
        <p class="text-white mb-0">${cafeteria.direccion}</p>
    </div>
`

// CARRUSEL DE FOTOS

const carrusel = document.getElementById("carrusel")
carrusel.innerHTML = `
    <div class="carousel-item active card">
    <img src="${cafeteria.foto1}" class="d-block w-100 object-fit-cover" style="height: 300px;" alt="...">
    </div>
    <div class="carousel-item card">
    <img src="${cafeteria.foto2}" class="d-block w-100 object-fit-cover" style="height: 300px;" alt="...">
    </div>
    <div class="carousel-item card">
    <img src="${cafeteria.foto3}" class="d-block w-100 object-fit-cover" style="height: 300px;" alt="...">
    </div>
    <div class="carousel-item card">
    <img src="${cafeteria.foto4}" class="d-block w-100 object-fit-cover" style="height: 300px;" alt="...">
    </div>
`

// MAPA
let map = L.map('map2').setView([cafeteria.coordenada1, cafeteria.coordenada2], 18);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let cafe = L.marker([cafeteria.coordenada1, cafeteria.coordenada2],{title: cafeteria.nombre}).addTo(map);


// CARACTERÍSTICAS
let especialidad = document.getElementById('especialidad');
cafeteria.especialidad == true ? especialidad.innerText = "Sí" : especialidad.innerText = "No";
if(!cafeteria.especialidad){especialidad.innerText = "No hay datos"};

let veggie = document.getElementById('veggie');
cafeteria.veggie == true ? veggie.innerText = "Sí" : veggie.innerText = "No";
if(!cafeteria.veggie){veggie.innerText = "No hay datos"};

let vegan = document.getElementById('vegan');
cafeteria.vegan == true ? vegan.innerText = "Sí" : vegan.innerText = "No";
if(!cafeteria.vegan){vegan.innerText = "No hay datos"};

let gluten = document.getElementById('gluten');
cafeteria.gluten == true ? gluten.innerText = "Sí" : gluten.innerText = "No";
if(!cafeteria.gluten){gluten.innerText = "No hay datos"};

let lactosa = document.getElementById('lactosa');
cafeteria.lactosa == true ? lactosa.innerText = "Sí" : lactosa.innerText = "No";
if(!cafeteria.lactosa){lactosa.innerText = "No hay datos"};

let diabetico = document.getElementById('diabetico');
cafeteria.diabetico == true ? diabetico.innerText = "Sí" : diabetico.innerText = "No";
if(!cafeteria.diabetico){diabetico.innerText = "No hay datos"};

let alcohol = document.getElementById('alcohol');
cafeteria.alcohol == true ? alcohol.innerText = "Sí" : alcohol.innerText = "No";
if(!cafeteria.alcohol){alcohol.innerText = "No hay datos"};

let almuerzo = document.getElementById('almuerzo');
cafeteria.almuerzo == true ? almuerzo.innerText = "Sí" : almuerzo.innerText = "No";
if(!cafeteria.almuerzo){almuerzo.innerText = "No hay datos"};

let takeaway = document.getElementById('takeaway');
cafeteria.takeaway == true ? takeaway.innerText = "Sí" : takeaway.innerText = "No";
if(!cafeteria.takeaway){takeaway.innerText = "No hay datos"};

let delivery = document.getElementById('delivery');
cafeteria.delivery == true ? delivery.innerText = "Sí" : delivery.innerText = "No";
if(!cafeteria.delivery){delivery.innerText = "No hay datos"};

let reserva = document.getElementById('reserva');
cafeteria.reserva == true ? reserva.innerText = "Sí" : reserva.innerText = "No";
if(!cafeteria.reserva){reserva.innerText = "No hay datos"};

let pagos = document.getElementById('pagos');
cafeteria.pagos ? pagos.innerText = cafeteria.pagos : pagos.innerText = "No hay datos";

let wifi = document.getElementById('wifi');
cafeteria.wifi == true ? wifi.innerText = "Sí" : wifi.innerText = "No";
if(!cafeteria.wifi){wifi.innerText = "No hay datos"};

let outdoor = document.getElementById('outdoor');
cafeteria.outdoor == true ? outdoor.innerText = "Sí" : outdoor.innerText = "No";
if(!cafeteria.outdoor){outdoor.innerText = "No hay datos"};

let accesible = document.getElementById('accesible');
cafeteria.accesible == true ? accesible.innerText = "Sí" : accesible.innerText = "No";
if(!cafeteria.accesible){accesible.innerText = "No hay datos"};

let mascotas = document.getElementById('mascotas');
cafeteria.mascotas == true ? mascotas.innerText = "Sí" : mascotas.innerText = "No";
if(!cafeteria.mascotas){mascotas.innerText = "No hay datos"};

let bicicleta = document.getElementById('bicicleta');
cafeteria.bicicleta == true ? bicicleta.innerText = "Sí" : bicicleta.innerText = "No";
if(!cafeteria.bicicleta){bicicleta.innerText = "No hay datos"};

let extra = document.getElementById('extra');
!cafeteria.extra ? extra.parentElement.parentElement.style.display = 'none' : extra.innerText = cafeteria.extra

let contacto = document.getElementById('telefono');
!cafeteria.telefono ? telefono.parentElement.parentElement.style.display = 'none' : telefono.innerText += cafeteria.telefono;

let web = document.getElementById('web');
!cafeteria.web ? web.parentElement.parentElement.style.display = 'none' : web.href = cafeteria.web;

let instagram = document.getElementById('instagram');
!cafeteria.instagram ? instagram.parentElement.parentElement.style.display = 'none' : instagram.href = cafeteria.instagram;

// HORARIOS
 const horarios = document.getElementById("horarios")
 horarios.innerHTML = `
    <div>
        <li class="dropdown-item"><strong>Lunes: </strong><span>${cafeteria.lunes}</span</li>
        <li class="dropdown-item"><strong>Martes: </strong><span>${cafeteria.martes}</span</li>
        <li class="dropdown-item"><strong>Miércoles: </strong><span>${cafeteria.miercoles}</span</li>
        <li class="dropdown-item"><strong>Jueves: </strong><span>${cafeteria.jueves}</span</li>
        <li class="dropdown-item"><strong>Viernes: </strong><span>${cafeteria.viernes}</span</li>
        <li class="dropdown-item"><strong>Sábado: </strong><span>${cafeteria.sabado}</span</li>
        <li class="dropdown-item"><strong>Domingo: </strong><span>${cafeteria.domingo}</span</li>
    </div>
 `
 