const updateBar = () => {
    const progress = document.querySelector(".progress__bar")
    let scroll = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100)
    progress.style.width = `${scroll}%`
}
window.addEventListener("scroll", updateBar)

