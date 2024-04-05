// cattura elementi

let myNavbar = document.querySelector('#myNavbar')
let links = document.querySelectorAll('.nav-link')
console.log(links);
let logo = document.querySelector('.img-logo')
let navbarToggler = document.querySelector('.navbar-toggler')
let divCollapse = document.querySelector('#collapse')
// console.dir(logo)


navbarToggler.addEventListener('click', () => {
    console.log(navbarToggler.ariaExpanded);
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


    if (navbarToggler.ariaExpanded === "false") {

        divCollapse.classList.remove(addNavCollpase);
        divCollapse.classList.remove(removeNavCollapse);

    } else if (navbarToggler.ariaExpanded === "true") {

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

// CHIAMATE ASINCRONE SONO UN TIPO PARTICOLARE DI METODO CHE ASPETTA PRIMA IL CARICAMENTO DELLA PAGINA WEB E POI UNA VOLTA CARICATA TUTTA LA PARTE GLOBALE DEL CODICE PARTE LA CHIAMATA ASINCRONA.

// setInterval(): CREA UN LOOP INFINITO CHE NON BLOCCA IL BROSWER 
// clearInterval(): BLOCCA UN INTERVALLO MA HA BISOGNO DI UN PARAMETRO CHE RAPPRESENTI L'INTERVALLO STESSO

// interseptionObserver() 
let firstNumber = document.querySelector('#firstNumber')
let secondNumber = document.querySelector('#secondNumber')
let thirdNumber = document.querySelector('#thirdNumber')



function createInterval(number, element, timing) {
    let count = 0;
    let interval = setInterval(() => {
        if (count < number) {
            count++;
            element.innerHTML = count;
        }
        else {
            clearInterval(interval);
        }
    }, timing);
};

let confirm = false;
let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !confirm) {

            createInterval(2000, firstNumber, 10)
            createInterval(4000, secondNumber, 5)
            createInterval(50, thirdNumber, 100)
            confirm = true;
        }
    })
});

observer.observe(firstNumber);

var swiper = new Swiper(".mySwiper", {
    speed: 600,
    parallax: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

let reviews = [
    { name: "Elia", title: "La mia più bella esperienza", "description": "Bellissima esperienza, personale gentile, preparato e rapido, prezzi onestissimi" },
    { name: "Vincenzo", title: "Pessima esperienza", "description": "Sito disgustoso e poco professionale" },
    { name: "Laura", title: "Esperienza COOL", "description": "Accoglienza Top, qualità dei prodotti eccellente, solo un po' lenta la spedizione" },
    { name: "Stefano", title: "Bello", "description": "TOP!! :)" },
    { name: "Gianmarco", title: "Altrove si trova di meglio", "description": "le scarpe si sono rotte dopo 2 giorni! SCONSIGLIATO :(" },
    { name: "Rocco", title: "Bellissima esperienza", "description": "Abbiamo mangiato bene ma i camerrieri non sono stati professionali" },
];


let swiperWrapper = document.querySelector(".swiper-wrapper")
let addReviews = document.querySelector("#addReviews")
let userName = document.querySelector("#userName")
let userTitle = document.querySelector("#userTitle")
let userDescription = document.querySelector("#userDescription")


function generateCards() {
    swiperWrapper.innerHTML = "";
    reviews.forEach(review => {

        let div = document.createElement("div");
        div.classList.add("swiper-slide")

        div.innerHTML = `<div class="title" data-swiper-parallax="-300">${review.name}</div>
        <div class="subtitle" data-swiper-parallax="-200">${review.title}</div>
        <div class="text" data-swiper-parallax="-100">
            <p>
                ${review.description}
            </p>
        </div>`

        swiperWrapper.appendChild(div)
    })
}


reviews.push({ name: "rich", title: "Bello", "description": "TOP!! :)" })
generateCards();

addReviews.addEventListener('click', () => {
    if (userName.value !== "" && userTitle.value !== "" && userDescription.value !== "") {

        // console.log('eccomi');
        // console.log(userName.value);
        // console.log(userTitle.value);
        // console.log(userDescription.value);

        reviews.push({ "name": userName.value, "title": userTitle.value, "description": userDescription.value })

        generateCards();
        userName.value = ""
        userTitle.value = ""
        userDescription.value = ""
        // console.log(reviews);
        swiper.update();
    }
})

// dark mode

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

