const intro = document.getElementById("intro")

const header = document.getElementById("header")
const footer = document.getElementById("footer")
const main = document.getElementById("main")

const cards = document.querySelector(".cards")
const dots = document.querySelectorAll(".dot")

const nextBtn = document.getElementById("nextBtn")
const skip = document.querySelector(".skip")

const onboarding = document.getElementById("onboarding")
const signupPage = document.getElementById("signup-page")

const cycleInput = document.getElementById("cycleLength");
const cycleUnknown = document.getElementById("cycleUnknown");
const unit = document.querySelector(".unit");

let index = 0
const totalCards = 3

// intro click
intro.addEventListener("click",()=>{
    intro.style.display="none"

    header.style.display="flex"
    footer.style.display="flex"
    main.style.display="flex"
})

function updateSlider(){
    cards.style.transform=`translateX(-${index*100}%)`

    dots.forEach(dot=>dot.classList.remove("active"))

    dots[index].classList.add("active")
}

nextBtn.addEventListener("click",()=>{
    index++

    if(index>=totalCards){
        finishOnboarding()
    }else{
        updateSlider()
    }
})

skip.addEventListener("click",finishOnboarding)

function finishOnboarding(){
    onboarding.style.display="none"
    signupPage.style.display="block"
}

// swipe
let startX=0

cards.addEventListener("touchstart",(e)=>{
    startX=e.touches[0].clientX
})

cards.addEventListener("touchend",(e)=>{
    let endX=e.changedTouches[0].clientX   
    let diff=startX-endX

    if(diff>50 && index<totalCards-1){
        index++
        updateSlider()
    }

    if(diff<-50 && index>0){
        index--
        updateSlider()
    }
})

// input cycleLength
cycleUnknown.addEventListener("change", () => {
  if (cycleUnknown.checked) {
    cycleInput.disabled = true;
    cycleInput.value = ""; // 값 비우기 (정하지 않음)

    cycleInput.style.display = "none";
    unit.style.display = "none";
  } else {
    cycleInput.disabled = false;

    cycleInput.style.display = "block";
    unit.style.display = "block";
  }
});