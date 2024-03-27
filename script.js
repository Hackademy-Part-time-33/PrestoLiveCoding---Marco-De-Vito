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

const swiper = new Swiper('.swiper', {
    // Optional parameters
    // direction: 'oriziontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  });