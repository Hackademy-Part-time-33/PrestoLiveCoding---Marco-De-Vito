let myNavbar = document.querySelector('#myNavbar')
let links = document.querySelectorAll('.nav-link')
let logo = document.querySelector('.img-logo')
let wrapperCard = document.querySelector('#wrapperCard')
let navbarToggler = document.querySelector('.navbar-toggler')
let divCollapse = document.querySelector('#collapse')

// console.dir(logo)

changeNavbar("nav-custom", "logo-nero", 'var(--Black)', "2px solid var(--Gold)", "transparent", "collapse-white", "collapse-black")

navbarToggler.addEventListener('click', () => {

    if (navbarToggler.ariaExpanded) {

        let scrolled = window.scrollY

        if (scrolled > 0) {
            divCollapse.classList.add("collapse-black")
        } else {
            divCollapse.classList.add("collapse-white")
        }
    }

})



// console.log(window);
window.addEventListener("scroll", () => {
    let scrolled = window.scrollY

    if (scrolled > 0) {

        changeNavbar("nav-blur", "logo-bianco", 'var(--White)', "2px solid var(--Gold)", "transparent", "collapse-black", "collapse-white")
    } else {
        myNavbar.classList.remove("nav-blur")
        changeNavbar("nav-custom", "logo-nero", 'var(--Black)', "2px solid var(--Gold)", "transparent", "collapse-white", "collapse-black")
    }
})

function changeNavbar(background, imglogo, color1, color2, color3, addNavCollpase, removeNavCollapse) {
    myNavbar.classList.add(background)
    // console.log(navbarToggler.ariaExpanded);

    if (navbarToggler.ariaExpanded === "false") {
        // console.log("ciao");
        divCollapse.classList.remove(addNavCollpase);
        divCollapse.classList.remove(removeNavCollapse);
    } else if (navbarToggler.ariaExpanded === "true") {
        // console.log('hello');
        divCollapse.classList.add(addNavCollpase);
        divCollapse.classList.remove(removeNavCollapse);
    }

    logo.src = `./Media/${imglogo}.png`
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

// localStorage()
// !USO UN API DA UN PROGETTO LARAVEL
//fetch("http://127.0.0.1:8000/api/products").then((response) => response.json()).then((data) => {
fetch("annunci.json").then((response) => response.json()).then((data) => {
    let categoryWrapper = document.querySelector('#categoryWrapper')
    let cardWrapper = document.querySelector('#cardWrapper')


    console.log(data);

    function setCategory() {
        let category = data.map((annuncio) => annuncio.category);
        // console.log(category);
        let uniqueCategory = [];
        category.forEach(category => {
            if (!uniqueCategory.includes(category)) {
                uniqueCategory.push(category)
            }


        })
        // console.log(uniqueCategory);        
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
        listCard.sort((a, b) => b.price - a.price)
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

    // CATEGORIA
    function filterByCategory(arrayTotal) {
        // console.log(radios);

        let checked = Array.from(radios).find((button) => button.checked)
        let categoria = checked.id;
        if (categoria != "all") //se non ho cliccato "tutte le categorie" 
        {
            // crea nuovo array filtrato
            // let filtered = arrayTotal.filter(annuncio => annuncio.category == categoria);

            let filtered = arrayTotal.filter(annuncio => annuncio.category == categoria);
            // showCard(filtered)
            return filtered

        }
        else {
            // showCard(data)
            return arrayTotal
        }
        // console.log(checked);
    }
    // filterByCategory()

    radios.forEach(button => {
        button.addEventListener("click", () => { filterByAll() });

    })


    // PREZZO
    let inputPrice = document.querySelector('#inputPrice')
    let priceNumber = document.querySelector('#priceNumber')

    function setPriceInput() {
        let maxPrice = data[0].price
        inputPrice.max = maxPrice
        inputPrice.value = maxPrice
        // console.log(maxPrice);
        priceNumber.innerHTML = maxPrice
    }
    setPriceInput()

    inputPrice.addEventListener("input", () => {
        priceNumber.innerHTML = inputPrice.value
        // filterByPrice()
        filterByAll()

    });

    function filterByPrice(arrayTotal) {
        let filtered = arrayTotal.filter(card =>
            // Number(card.price) <= Number(inputPrice.value))
            +card.price <= +inputPrice.value)

        // showCard(filtered)
        return filtered
    }

    // PAROLA
    let inputWord = document.querySelector('#inputWord')

    inputWord.addEventListener("input", () => {
        filterByAll()
    })

    function filterByWord(arrayTotal) {
        let filtered = arrayTotal.filter(card => card.name.toLowerCase().includes(inputWord.value.toLowerCase()))

        // showCard(filtered)
        return filtered
    }

    function filterByAll() {
        let arrayTotal = filterByCategory(data)
        // console.log(arrayTotal);
        arrayTotal = filterByPrice(arrayTotal)
        // console.log(arrayTotal);
        arrayTotal = filterByWord(arrayTotal)
        showCard(arrayTotal)
        // console.log(arrayTotal);
    }

    
    let clearButton=document.querySelector('#clearButton')

    clearButton.addEventListener('click',()=>{
        inputWord.value=""

        let maxPrice = data[0].price
        inputPrice.value = maxPrice
        priceNumber.innerHTML = inputPrice.value
        let checked = Array.from(radios).find((button) => button.checked)
        checked.checked=false
        let categoryAll =document.querySelector('#all')
        categoryAll.checked=true;
        showCard(data)
    })

});


let btnDarkMode = document.querySelector('#btnDarkMode');

let isClicked = true;

btnDarkMode.addEventListener('click', () => {
    if (isClicked) {
        document.documentElement.style.setProperty('--light', "rgb(26, 26, 26)")
        document.documentElement.style.setProperty('--dark', "rgb(250, 250, 250)")
        btnDarkMode.innerHTML = '<i class="fa-regular fa-sun"></i>'
        isClicked = false
        localStorage.setItem('mode', 'dark')
    } else {
        document.documentElement.style.setProperty('--light', "rgb(250, 250, 250)")
        document.documentElement.style.setProperty('--dark', "rgb(26, 26, 26)")
        btnDarkMode.innerHTML = '<i class="fa-solid fa-moon"></i>'
        isClicked = true
        localStorage.setItem('mode', 'light')
    }
})


let mode = localStorage.getItem('mode')
console.log(mode);

if (mode === 'dark') {
    document.documentElement.style.setProperty('--light', "rgb(26, 26, 26)")
    document.documentElement.style.setProperty('--dark', "rgb(250, 250, 250)")
    btnDarkMode.innerHTML = '<i class="fa-regular fa-sun"></i>'
    isClicked = false
} else {
    document.documentElement.style.setProperty('--dark', "rgb(26, 26, 26)")
    document.documentElement.style.setProperty('--light', "rgb(250, 250, 250)")
    btnDarkMode.innerHTML = '<i class="fa-solid fa-moon"></i>'
    isClicked = true
}




