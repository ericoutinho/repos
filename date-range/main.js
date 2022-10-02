const checkin = document.getElementById("checkin")
const checkout = document.getElementById("checkout")
const button = document.querySelector("button")
const display = document.querySelector(".display")

const dateInMiliseconds = (datetime) => {
    const [thedate, thetime] = datetime.split("T")
    const [year, month, day] = thedate.split("-")
    const [hour, minute] = thetime.split(":")

    return Date.UTC(year, month - 1, day, hour, minute, 0)
}

const calculateRange = (checkin, checkout) => {

    const diff = dateInMiliseconds(checkout) - dateInMiliseconds(checkin)

    const totalDays = diff / (1000 * 60 * 60 * 24)
    const totalMonths = Math.floor(diff / (1000 * 60 * 60 * 24) * 0.0329)
    const totalHours = diff / (1000 * 60 * 60)
    const totalMinutes = diff / (1000 * 60)
    
    const years = Math.floor(totalDays / 365)
    const months = totalMonths % 12
    const days = Math.round(totalDays % 30.417)
    const hours = Math.floor(totalHours % 24)
    const minutes = totalMinutes % 60

    const theRange =  [
        years > 0 ? years + ' ano(s)' : false,
        months > 0 ? months + ' mes(es)' : false,
        days > 0 ? days + ' dia(s)' : false,
        hours > 0 ? hours + ' hora(s)' : false,
        minutes > 0 ? minutes + ' minuto(s)' : false
    ]

    // console.table({
    //     'years': years, 
    //     'months': months, 
    //     'days': days, 
    //     'hours': hours,
    //     'minutes': minutes
    // })

    display.classList.remove("show")
    display.classList.add("show")
    display.innerHTML = theRange.filter(item => item).join(", ")
}

button.addEventListener("click", () => calculateRange(checkin.value, checkout.value))