let myNavbar = document.querySelector('#myNavbar')
let links = document.querySelectorAll('.nav-link')
let logo = document.querySelector('.img-logo')
let wrapperCard = document.querySelector('#wrapperCard')

// console.dir(logo)



// console.log(window);
window.addEventListener("scroll", () => {
    let scrolled = window.scrollY

    if (scrolled > 0) {
        // myNavbar.classList.add("nav-blur")


        // links.forEach(link => {
        //     link.style.color = 'var(--White)'
        //     link.addEventListener('mouseenter', () => {
        //         link.style.borderBottom = "2px solid var(--Gold)"
        //     })
        //     link.addEventListener('mouseleave', () => {
        //         link.style.borderBottom = "transparent"
        //     })
        // });
        changeNavbar("nav-blur", "logo-bianco", 'var(--White)', "2px solid var(--Gold)", "transparent")
    } else {
        myNavbar.classList.remove("nav-blur")
        // logo.src = "http://127.0.0.1:5500/Media/logo-nero.png"
        // links.forEach(link => {
        //     link.style.color = 'var(--Black)'
        //     link.addEventListener('mouseenter', () => {
        //         link.style.borderBottom = "2px solid var(--Gold)"
        //     })
        //     link.addEventListener('mouseleave', () => {
        //         link.style.borderBottom = "transparent"
        //     })
        // });
        changeNavbar("nav-custom", "logo-nero", 'var(--Black)', "2px solid var(--Gold)", "transparent")

    }
})

function changeNavbar(background, imglogo, color1, color2, color3) {
    myNavbar.classList.add(background)
    logo.src = `http://127.0.0.1:5500/Media/${imglogo}.png`
    links.forEach(link => {
        link.style.color = color1
        link.addEventListener('mouseenter', () => {
            link.style.borderBottom = color2
        })
        link.addEventListener('mouseleave', () => {
            link.style.borderBottom = color3
        })
    });
}

// PASSAGGIO N1: CONNETTERMI AL JSON E QUINDI PORTARMI IL JSON SUL PROGETTO
// PASSAGGIO N2: CONVERTIRE IL JSON IN UN OGGETTO JAVASCRIPT ,then((response))
// PASSAGGIO N3: UTILIZZARE L'OGGETTO data

fetch("./annunci.json").then((response) => response.json()).then((data) => {

    let categoryWrapper = document.querySelector('#categoryWrapper')
    let cardWrapper = document.querySelector('#cardWrapper')


    console.log(data);

    function setCategory() {
        let category = data.map((annuncio) => annuncio.category);
        console.log(category);
        let uniqueCategory = [];
        category.forEach(category => {
            if (!uniqueCategory.includes(category)) {
                uniqueCategory.push(category)
            }


        })
        console.log(uniqueCategory);
        uniqueCategory.forEach(category => {
            let div = document.createElement('div')
            div.classList.add('form-check')
            div.innerHTML = `<input class="form-check-input" type="radio" name="category" id="${category}">
        <label class="form-check-label" for="${category}">
            ${category}
        </label>`
            categoryWrapper.appendChild(div);
        })
    }
    setCategory();

    function showCard(listCard) {
        listCard.sort((a, b) => a.price - b.price)
        cardWrapper.innerHTML = "" //pulisco il wrapper per la funzione filtro
        listCard.forEach(el => {
            let card = document.createElement('div')
            // card.classList.add('col-12', 'col-md-4')
            card.classList.add("card", "mb-4")
            card.style.width = "16rem";

            card.innerHTML = `<img src="${el.image}" class="card-img-top" alt="immagine oggetto">
            <div class="card-body">
                <h5 class="card-title">${el.name}</h5>
                <p class="card-text">${el.category}</p>
                <p>${el.price}€</p>
            `
            cardWrapper.appendChild(card)
        })
    }
    showCard(data);


    // input radio
    let radios = document.querySelectorAll(".form-check-input")
    function filterByCategory() {
        // console.log(radios);
        let checked = Array.from(radios).find((button) => button.checked)
        let categoria = checked.id;
        if (categoria != "all") //se non ho cliccato "tutte le categorie" 
        {
            // crea nuovo array filtrato
            let filtered = data.filter(annuncio => annuncio.category == categoria);
            showCard(filtered)
        }
        else{
            showCard(data)
        }
        // console.log(checked);
    }
    // filterByCategory()

    radios.forEach(button => {
        button.addEventListener("click", () => { filterByCategory() });

    })



});



// fetch: chiamata asincrona che si occupa di collegare il mio foglio di lavoro con l'esterno o l'interno del mio progetto
// api:  sono degli indirizzi
// chiavi-api: sono chiavi speciali 