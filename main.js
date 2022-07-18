import './style.css'

// slider
const slideBtn = document.querySelectorAll('[data-slideBtn]');
const slideContainer = document.querySelector('[data-slidecontainer]');
const slides = [...document.querySelectorAll('[data-slide]')];

let currentIndex= 0;

let isMoving = false;

//remove/add attributes
const addDisabledAttribute =(els) => els.forEach(el=>el.setAttribute('disabled', 'true'));
const removeDisabledAttribute =(els) => els.forEach(el=>el.removeAttribute('disabled'));

// events

slideBtn.forEach(btn => btn.addEventListener('click', handleSlideBtnClick));

slideContainer.addEventListener('sliderMove', () =>{
    slideContainer.style.transform = `translateX(-${currentIndex * slides[0].clientWidth}px)`;

    removeDisabledAttribute(slideBtn);

    currentIndex=== 0 && addDisabledAttribute([slideBtn[0]]);
}
)

//transition and event

slideContainer.addEventListener('transitionend', ()=>isMoving = false);

//disable image-drag

document.querySelectorAll('[data-slide] img').forEach(img =>img.ondragstart =() => false);

// functions

function handleSlideBtnClick(e) {
    if(isMoving) return;
    isMoving = true
    e.currentTarget.id ==="prev" ? currentIndex-- : currentIndex++;
    slideContainer.dispatchEvent(new Event("sliderMove"));
}

// intersection observer
const slideObserver = new IntersectionObserver((slide)=> {
    if(slide[0].isIntersecting){
        addDisabledAttribute([slideBtn[1]]);
    }
}, {threshold: .25});

slideObserver.observe(slides[slides.length -1]);

// form handle

const contactForm = document.querySelector("#contact")
const contactBtn = document.querySelector("#contact-btn");
const contactInput = document.querySelector("#email");

function postEmailToDatabase(email){
    console.info(`Your email is ${email}`);
    return new Promise(resolve => setTimeout(resolve, 2000));
}

async function handleFormSubmit(e){
    e.preventDefault();
    addDisabledAttribute([contactForm, contactBtn]);
    const userEmail = contactInput.value;
    contactInput.style.display = 'none';
    await postEmailToDatabase(userEmail);
    
}
// event listener

contactForm.addEventListener('submit', handleFormSubmit);