const calendarGrid = document.getElementById("calendarGrid")

const monthTitle = document.getElementById("calenderMonth")
const yearTitle = document.getElementById("calendarYear")

const modal = document.getElementById("periodModal")
const startInput = document.getElementById("startDate")
const endInput = document.getElementById("endDate")

const cycleLengthText = document.getElementById("cycleLength")

let currentDate = new Date()

// storgae
function loadData(){
    const data = localStorage.getItem("periodData")

    if(!data) return []
    return JSON.parse(data)
}

function saveData(data){
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth()-6)

    const filtered = data.filter(item=>{
        return new Date(item.start) > sixMonthsAgo
    })

    localStorage.setItem("periodData",JSON.stringify(filtered))
}

// calendar
function renderCalendar(){
    calendarGrid.innerHTML = ""

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year,month,1).getDay()
    const lastDate = new Date(year,month+1,0).getDate()

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    
    // monthTitle.innerText = `${month+1}`
    monthTitle.innerText = `${months[month]}`
    // yearTitle.innerText = `${year}`
    yearTitle.innerText = `${String(year).slice(2)}`

    const periodData = loadData()

    for(let i=0;i<firstDay;i++){
        const blank = document.createElement("div")
        calendarGrid.appendChild(blank)
    }

    for(let d=1; d<=lastDate; d++){
        const dateStr = `${year}-${month+1}-${d}`

        const day = document.createElement("div")
        day.classList.add("calendar-day")
        day.innerHTML = `<span>${d}</span>`

        day.dataset.date = dateStr

        const hasPeriod = periodData.some(item=>{
            const start = new Date(item.start)
            const end = new Date(item.end)
            const date = new Date(dateStr)

            return date >= start && date <= end
        })

        if(hasPeriod){
            const dot = document.createElement("div")
            dot.classList.add("period-dot")

            day.appendChild(dot)
        }
        day.addEventListener("click",openModal)
        calendarGrid.appendChild(day)
    }
    calculateCycle()
}

// modal
function openModal(e){
    const date = e.currentTarget.dataset.date

    modal.style.display="flex"

    startInput.value = date
    endInput.value = date
}

document.getElementById("cancelModal").onclick=()=>{
    modal.style.display="none"
}

document.getElementById("submitModal").onclick=()=>{
    alert('아직 지원하지 않는 기능입니다.')
}

// month navigation
document.getElementById("prevMonth").onclick=()=>{
    currentDate.setMonth(currentDate.getMonth()-1)
    renderCalendar()
}

document.getElementById("nextMonth").onclick=()=>{
    currentDate.setMonth(currentDate.getMonth()+1)
    renderCalendar()
}

renderCalendar()