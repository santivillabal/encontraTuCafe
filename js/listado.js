import { getCafeterias } from './firebase.js';
const cafeterias = []
const listSection = document.getElementById("listSection");



function showList(cafeteria, id) {
    listSection.innerHTML += `
    <div class="col-lg-4 col-md-6 p-3 listItem" id="${id}">
    <div class="my-3">
        <div class="card text-white listCard">
          <img src="${cafeteria.foto1}" class="card-img listImg" alt="...">
          <div class="card-img-overlay d-flex align-items-end itemCard">
            <h5 class="card-title">${cafeteria.nombre}</h5>
          </div>
        </div>                  
    </div>
  </div>
  `
}

// MUESTRA EL LISTADO COMPLETO

window.addEventListener("DOMContentLoaded", async() => {
    const querySnapshot = await getCafeterias();
    querySnapshot.forEach(doc => {
        cafeterias.push((doc.data()));
    });
    cafeterias.forEach(cafeteria => {
        showList(cafeteria, cafeteria.id);
    });
    const listItems = document.querySelectorAll('div.listItem');
    for (let i=0; i<listItems.length; ++i) {
      listItems[i].addEventListener('click', redirect);
    }
    
    function redirect() {
        let cafe = cafeterias.filter((cafeteria) => cafeteria.id == this.id);
        localStorage.setItem("cafeteria", JSON.stringify(cafe[0]));
        window.location = "./cafeteria.html";
    }


    // LIMPIA EL FILTRO E IMPRIME EL LISTADO COMPLETO

    document.getElementById("clearbtn").addEventListener("click", function(e){
        e.preventDefault()
        clear()
    });

    function clear(){
        listSection.innerHTML = "";
        cafeterias.forEach(cafeteria => {
            showList(cafeteria, cafeteria.id);
        });
        let check = document.querySelectorAll('input[type="checkbox"]');
        for (let i=0; i<check.length; i++){
            check[i].checked = false
        }
    }

    // FILTRO POR CARACTERÍSTICAS

    document.getElementById("submitbtn").addEventListener("click", function(e){
        e.preventDefault()
        submit()
    });

            // CREA ARRAY DE CARACTERÍSTICAS SELECCIONADAS

    function submit() {
        let check = document.querySelectorAll('input[type="checkbox"]:checked');
        let selected = [];
        if (check && check.length > 0) {
            for (let i = 0; i < check.length; i++) {
                selected.push(check[i].getAttribute("rel"));
            }
        }

            // CREA UN ARRAY DE TODAS LAS CAFETERÍAS QUE CUMPLEN LAS CONDICIONES

        let arr = [];
        for (let i=0; i < selected.length; i++){
            cafeterias.forEach(cafeteria => {
                if(cafeteria[selected[i]] == true) {
                    arr.push(cafeteria);
                }
            })
        }

            // FILTRA CAFETERÍAS DUPLICADAS

        const ids = arr.map(({ id }) => id);
        let filtered = arr.filter(({ id }, index) => !ids.includes(id, index + 1));
        listSection.innerHTML = "";

            // FILTRA SOLO LAS CAFETERÍAS QUE CUMPLEN TODAS LAS CONDICIONES

        for (let i=0; i < selected.length; i++){
            filtered.forEach(el => {
                if(el[selected[i]] == false || !el[selected[i]]) {
                    filtered = filtered.filter(elem => elem.nombre != el.nombre);
                }
            })
        }
        
            // IMPRIME CAFETERÍAS FILTRADAS

        filtered.forEach(element => {
            showList(element, element.id); 
        });
        const listItems = document.querySelectorAll('div.listItem');
        for (let i=0; i<listItems.length; ++i) {
          listItems[i].addEventListener('click', redirect);
        }

    }

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



