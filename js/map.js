import { getCafeterias } from './firebase.js';

let map = L.map('map').setView([-34.89362652284752, -56.164279954917674], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const cafeterias = [];


function mapCafeterias(cafeteria, id){
    let cafe = L.marker([cafeteria.coordenada1, cafeteria.coordenada2],{title: cafeteria.nombre}).addTo(map);
    cafe.bindPopup(`
        <h4>${cafeteria.nombre}</h4>
        <button class="item btn btn-sm boton" id="${id}">Ver más</button>
    `);
}


window.addEventListener("DOMContentLoaded", async() => {
    const querySnapshot = await getCafeterias();
    querySnapshot.forEach(doc => {
        cafeterias.push((doc.data()));
    });
    cafeterias.forEach(cafeteria => {
        mapCafeterias(cafeteria, cafeteria.id);
    });

    const search = document.getElementById('search');
    const results = document.getElementById('results');
    let elementValue = "";

    search.addEventListener('keyup', (element) => {
        results.innerHTML = ``;
        if (element.keyCode >= 65 && element.keyCode <= 90) elementValue += element.key.toString();
        if (element.key == "Backspace") elementValue = elementValue.slice(0, -1);
        console.log(elementValue)
        const filtered = cafeterias.filter((cafeteria) => cafeteria.nombre.toUpperCase().includes(elementValue.toUpperCase().trim()));

        if (!filtered.length){
            results.textContent = 'No hay resultados';
        } else if (!elementValue) results.textContent = '';
        else{
            filtered.map((cafeteria) => cafeteria.nombre);
            console.log(filtered);
            for (let i=0; i< filtered.length; i++){
                results.innerHTML += `
                <li class="card p-2 item" id="${filtered[i].id}">${filtered[i].nombre}</li>
                `
            }
        } 


    });

const clicked = e => {
    if(e.target.classList.contains("item")){
        let cafe = cafeterias.filter((cafeteria) => cafeteria.id == e.target.id)
        localStorage.setItem("cafeteria", JSON.stringify(cafe[0]));
        console.log(cafe)
        window.location = "./cafeteria.html";
    }
}

document.addEventListener('click', clicked);


})










