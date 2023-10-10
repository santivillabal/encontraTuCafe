import { getCafeterias } from './firebase.js';
const cafeterias = []
const listSection = document.getElementById("listSection");

function hideLoader(){
    document.getElementById("loader").style.display = "none";
  }



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

    let check = document.querySelectorAll('input[type="checkbox"]');
    for (let i=0; i<check.length; i++){
        check[i].checked = false
    }
    const paginationList = document.getElementById("paginationList");
    let totalPages = Math.ceil(cafeterias.length / 12);
    hideLoader();
    for (let i=0; i < 12; i++){
        showList(cafeterias[i], cafeterias[i].id);
    }

    for (let i=1; i < totalPages + 1; i++){
        paginationList.innerHTML += `
        <li class="page-item"><a class="page-link" href="#">${i}</a></li>
        `
    }

    const page = e => {
        if(e.target.classList.contains("page-link")){
            e.preventDefault()
            let currentPage = parseInt(e.target.innerHTML);
            let start = (currentPage - 1) * 12;
            let end = currentPage * 12 - 1;
            listSection.innerHTML="";
            window.scrollTo({ top: 0, behavior: 'smooth' })
            for (let i=start; i < end+1; i++){
                if(!cafeterias[i]){break}
                showList(cafeterias[i], cafeterias[i].id);
            }
        }
        const listItems = document.querySelectorAll('div.listItem');
        for (let i=0; i<listItems.length; ++i) {
          listItems[i].addEventListener('click', redirect);
        }
    }

    paginationList.addEventListener('click', page)


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
        for (let i=0; i < 12; i++){
            showList(cafeterias[i], cafeterias[i].id);
        }
        let check = document.querySelectorAll('input[type="checkbox"]');
        for (let i=0; i<check.length; i++){
            check[i].checked = false
        }

        const paginationList = document.getElementById("paginationList");
        let totalPages = Math.ceil(cafeterias.length / 12);
        paginationList.innerHTML="";
        for (let i=1; i < totalPages + 1; i++){
            paginationList.innerHTML += `
            <li class="page-item"><a class="page-link" href="#">${i}</a></li>
            `
        }
        const page = e => {
            if(e.target.classList.contains("page-link")){
                e.preventDefault()
                let currentPage = parseInt(e.target.innerHTML);
                let start = (currentPage - 1) * 12;
                let end = currentPage * 12 - 1;
                listSection.innerHTML="";
                for (let i=start; i < end+1; i++){
                    if(!cafeterias[i]){break}
                    showList(cafeterias[i], cafeterias[i].id);
                }
            }
            const listItems = document.querySelectorAll('div.listItem');
            for (let i=0; i<listItems.length; ++i) {
              listItems[i].addEventListener('click', redirect);
            }
        }
        paginationList.addEventListener('click', page)
        const listItems = document.querySelectorAll('div.listItem');
        for (let i=0; i<listItems.length; ++i) {
          listItems[i].addEventListener('click', redirect);
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
        }else{return}

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

        const paginationList = document.getElementById("paginationList");
        let totalPages = Math.ceil(filtered.length / 12);
        paginationList.innerHTML="";

        for (let i=0; i < 12; i++){
            if(!filtered[i]){break}
            showList(filtered[i], filtered[i].id);
        }
    
        for (let i=1; i < totalPages + 1; i++){
            if(totalPages === 1){
                paginationList.innerHTML="";
            }else{
            paginationList.innerHTML += `
            <li class="page-item"><a class="page-link" href="#">${i}</a></li>
            `
            }
        }
    
        const page = e => {
            if(e.target.classList.contains("page-link")){
                e.preventDefault()
                let currentPage = parseInt(e.target.innerHTML);
                let start = (currentPage - 1) * 12;
                let end = currentPage * 12 - 1;
                listSection.innerHTML="";
                for (let i=start; i < end+1; i++){
                    if(!filtered[i]){break}
                    showList(filtered[i], filtered[i].id);
                }
            }
            const listItems = document.querySelectorAll('div.listItem');
            for (let i=0; i<listItems.length; ++i) {
              listItems[i].addEventListener('click', redirect);
            }
        }
    
        paginationList.addEventListener('click', page)

        const listItems = document.querySelectorAll('div.listItem');
        for (let i=0; i<listItems.length; ++i) {
          listItems[i].addEventListener('click', redirect);
        }

    }

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

const listClicked = e => {
    if(e.target.classList.contains("item")){
        let cafe = cafeterias.filter((cafeteria) => cafeteria.id == e.target.id)
        localStorage.setItem("cafeteria", JSON.stringify(cafe[0]));
        console.log(cafe)
        window.location = "./cafeteria.html";
    }else{
        results.innerHTML = "";
    }
}

document.addEventListener('click', listClicked);



})



