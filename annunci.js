let myNavbar = document.querySelector('#myNavbar')
let links = document.querySelectorAll('.nav-link')
let logo = document.querySelector('.img-logo')
let wrapperCard= document.querySelector('#wrapperCard')

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

// PASSAGGIO N1: CONNETTERMI AL JSON E QUINDI PORTARMI IL JSON SUL PROGETTO
// PASSAGGIO N2: CONVERTIRE IL JSON IN UN OGGETTO JAVASCRIPT ,then((response))
// PASSAGGIO N3: UTILIZZARE L'OGGETTO data

fetch("./annunci.json").then((response)=> response.json()).then((data)=>{
    
    console.log(data);
   function generaCard(listCard) {
    listCard.forEach(el=>{
        let card = document.createElement('div')
        card.classList.add('col-12','col-md-4')
        
        card.innerHTML=`<div class="card" style="width: 18rem;"><img src="${el.image}" class="card-img-top" alt="immagine oggetto">
        <div class="card-body">
            <h5 class="card-title">${el.name}</h5>
            <p class="card-text">${el.category}</p>
            <p>${el.price}€</p>
        </div>`
        wrapperCard.appendChild(card)
        })
   }
    
    generaCard(data);
    
});


// fetch: chiamata asincrona che si occupa di collegare il mio foglio di lavoro con l'esterno o l'interno del mio progetto 
// api:  sono degli indirizzi
// chiavi-api: sono chiavi speciali 