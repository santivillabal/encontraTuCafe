import { getCafeterias } from './firebase.js';

let map = L.map('map').setView([-34.89362652284752, -56.164279954917674], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const cafeterias = [];


function mapCafeterias(cafeteria){
    let cafe = L.marker([cafeteria.coordenada1, cafeteria.coordenada2],{title: cafeteria.nombre}).addTo(map);
    cafe.bindPopup(`
        <h4>${cafeteria.nombre}</h4>
        <button class="item btn btn-sm boton" id="${cafeteria.id}">Ver más</button>
    `);
}


const listClicked = e => {
    if(e.target.classList.contains("link")){
        let cafe = cafeterias.filter((cafeteria) => cafeteria.id == e.target.id)
        localStorage.setItem("cafeteria", JSON.stringify(cafe[0]));
        window.location = "./cafeteria.html";
    }else{
        results.innerHTML = "";
    }
}

const markerClicked = e => {
    if(e.target.classList.contains("item")){
        let cafe = cafeterias.filter((cafeteria) => cafeteria.id == e.target.id)
        localStorage.setItem("cafeteria", JSON.stringify(cafe[0]));
        window.location = "./cafeteria.html";
    }
}





window.addEventListener("DOMContentLoaded", async() => {
    const querySnapshot = await getCafeterias();
    querySnapshot.forEach(doc => {
        cafeterias.push((doc.data()));
    });
    cafeterias.forEach(cafeteria => {
        mapCafeterias(cafeteria);
    });

    const search = document.getElementById('search');
    const results = document.getElementById('results');
    let elementValue = "";

    search.addEventListener('input', (element) => {
        results.innerHTML = ``;
        if (element.inputType == "deleteContentBackward"){
            elementValue = elementValue.slice(0, -1);
        }else{
            elementValue += element.data;
        }
        const filtered = cafeterias.filter((cafeteria) => cafeteria.nombre.toUpperCase().includes(elementValue.toUpperCase().trim()));

        if (!filtered.length){
            results.textContent = 'No hay resultados';
        } else if (!elementValue) results.textContent = '';
        else{
            filtered.map((cafeteria) => cafeteria.nombre);
            for (let i=0; i< filtered.length; i++){
                results.innerHTML += `
                <li class="card p-2 link" id="${filtered[i].id}">${filtered[i].nombre}</li>
                `
            }
        } 


    });

document.addEventListener('click', listClicked);
document.addEventListener('click', markerClicked);


})










