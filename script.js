// cattura elementi

let myNavbar = document.querySelector('#myNavbar')
let links = document.querySelectorAll('.nav-link')
let logo = document.querySelector('.img-logo')

console.dir(logo)



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
            confirm=true;
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

  let reviews=[
    {name: "Elia", title:"La mia più bella esperienza", "description":"Bellissima esperienza, personale gentile, preparato e rapido, prezzi onestissimi"},
    {name: "Vincenzo", title:"Pessima esperienza", "description":"Sito disgustoso e poco professionale"},
    {name: "Laura", title:"Esperienza COOL", "description":"Accoglienza Top, qualità dei prodotti eccellente, solo un po' lenta la spedizione"},
    {name: "Stefano", title:"Bello", "description":"TOP!! :)"},
    {name: "Gianmarco", title:"Altrove si trova di meglio", "description":"le scarpe si sono rotte dopo 2 giorni! SCONSIGLIATO :("},
    {name: "Rocco", title:"Bellissima esperienza", "description":"Abbiamo mangiato bene ma i camerrieri non sono stati professionali"},
  ];


let swiperWrapper= document.querySelector(".swiper-wrapper")
let addReviews = document.querySelector("#addReviews")
let userName = document.querySelector("#userName")
let userTitle = document.querySelector("#userTitle")
let userDescription = document.querySelector("#userDescription")


function generateCards() {
    swiperWrapper.innerHTML="";
    reviews.forEach(review =>{
        
        let div= document.createElement("div");
        div.classList.add("swiper-slide")
        
        div.innerHTML=`<div class="title" data-swiper-parallax="-300">${review.name}</div>
        <div class="subtitle" data-swiper-parallax="-200">${review.title}</div>
        <div class="text" data-swiper-parallax="-100">
            <p>
                ${review.description}
            </p>
        </div>`
        
        swiperWrapper.appendChild(div)
      })
}
  

reviews.push({name: "rich", title:"Bello", "description":"TOP!! :)"})
generateCards();
 
addReviews.addEventListener('click', ()=>{
    if(userName.value!==""&&userTitle.value!==""&& userDescription.value!==""){
        
        console.log('eccomi');
        console.log(userName.value);
        console.log(userTitle.value);
        console.log(userDescription.value);
        
    reviews.push({"name": userName.value , "title": userTitle.value , "description":userDescription.value})

    generateCards(); 
    userName.value=""
    userTitle.value=""
    userDescription.value=""
    // console.log(reviews);
    swiper.update();
    }
})                                
              

