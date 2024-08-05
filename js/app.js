const button = document.getElementById("button")
const card = document.getElementById("card")
const main = document.getElementById("main")
const loader = document.getElementById("loader")
const saveImage = document.getElementById('save-image')

const URL = "https://dog.ceo/api/breeds/image/random"
let data = null

const imageHandler = async () => {
    try {
        const response = await fetch(URL)
        data = await response.json()
        console.log(data)
        start()
    } catch (err) {
        loader.style.display = "block"
        main.style.display = "none"
        alert('Fetch Error , Please Try Again!')
        card.innerHTML = `<img src = "${localStorage.getItem("prev")}" alt = "" >`
        console.log(err)
    }
}

const start = () => {
    showImage()
    loader.style.display = "none"
    main.style.display = "block"
}


const showImage = () => {
    const { message = null, status = null } = data
    console.log(message, status)
    if (status === "success") {
        loader.style.display = "none"
        main.style.display = "block"
        card.innerHTML = `<img src = "${message}" alt = "">`
        saveImage.innerHTML = `<a href=${message} donwnload target="_blank">
        <button id="saveImage">Save This Pic<img src="./img/1.png"></button></a>`
        localStorage.setItem("prev", message)
    } else if (message == null) {
        loader.style.display = "block"
        main.style.display = "none"
    }
}


const previousHandler = () => {
    let pervImage = localStorage.getItem("prev")
    console.log(pervImage)
    card.innerHTML = `<img src = "${pervImage}" alt = "" >`
}


const load = () => {
    setTimeout(() => {
        imageHandler()
    }, 1500)
}


window.addEventListener("load", load)
button.addEventListener("click", imageHandler)
card.addEventListener("click", imageHandler)