let pdata = {
    level: 1,
    exp: 0
}

let assignments = []

clear()

if (load("level")) {
    pdata["level"] = parseInt(load("level"))
    pdata["exp"] = parseInt(load("exp"))
}
// test
let inptxt = document.querySelector(".inptxt")
let levelTXT = document.querySelector(".level")
let expTXT = document.querySelector(".exp")

const jsConfetti = new JSConfetti()

if (loadList("assignments")) {
    let loadedData = loadList("assignments")

    for (var i = 0; i < loadedData.length; i++) {
        let val = loadedData[i]
        assignments.push([val[0], val[1], val[2], i])
    } 
}

for (var i = 0; i < assignments.length; i++) {
    let cassignment = assignments[i]
    newAssignment(cassignment[0], cassignment[1], cassignment[2], cassignment[3])
}

function save(dat) {
    for (var key in dat) {
        let val = dat[key]
        localStorage.setItem(key, val)
    }
}

function load(name) {
    return localStorage.getItem(name)
}

function saveList(name, list) {
    localStorage.setItem(name + "Length", list.length)

    for (var i = 0; i < list.length; i++) {
        localStorage.setItem(name + i, list[i][0])
        localStorage.setItem(name + i + "Checked", list[i][1])
        localStorage.setItem(name + i + "Time", list[i][2])
    }
}

function loadList(name) {
    let listlength = localStorage.getItem(name + "Length")
    let list = []

    for (var i = 0; i < listlength; i++) {
        let v1 = localStorage.getItem(name + i)
        let v2 = localStorage.getItem(name + i + "Checked")
        let v3 = localStorage.getItem(name + i + "Time")

        list.push([v1, v2, v3])
    }

    return list
}

function clear() {
    localStorage.clear()
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min
}

function completeAssignment(time) {
    pdata["exp"] += time

    summonColorfulConfetti([
        "#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"
    ], 8, time * 10)

    // summonEmojiConfetti([
    //     "💀"
    // ], 45, time * 5)
}

function uncompleteAssignment(time) {
    pdata["exp"] -= time
}

function newVirtualAssignment(name, checked, time) {
    assignments.push([name, checked, time])

    newAssignment(name, checked, time, assignments.length - 1)
}

function newAssignment(name, checked, time, vassignmenti) {
    let assignment = document.createElement("div")

    assignment.classList = "entry unchecked"
    
    if (checked === "true") {
        assignment.classList.replace("unchecked", "checked")
    }

    assignment.innerHTML += name

    document.body.appendChild(assignment)

    assignment.onclick = () => {
        // Replace with Image
        if (assignments[vassignmenti][1] == false) {
            assignments[vassignmenti][1] = true
            assignment.classList.replace("unchecked", "checked")
            completeAssignment(time)
        } else {
            assignments[vassignmenti][1] = false
            assignment.classList.replace("checked", "unchecked")
            uncompleteAssignment(time)
        }
    }

    let ex = document.createElement("span")
    ex.classList = "x"

    ex.onclick = () => {
        assignment.remove()
    }

    assignment.appendChild(ex)
}

function levelUpCheck() {
    while (pdata["exp"] < 0) {
        pdata["level"] -= 1
        pdata["exp"]  += pdata["level"]
    }

    while (pdata["exp"] >= pdata["level"]) {
        pdata["exp"] -= pdata["level"]
        pdata["level"] += 1
    }

    levelTXT.textContent = "Level: " + pdata["level"]
    expTXT.textContent = "Exp: " + pdata["exp"]
}

function summonColorfulConfetti(colors, confettiSize, confettiNum) {
    jsConfetti.addConfetti({
        confettiColors: colors,
        confettiRadius: confettiSize,
        confettiNumber: confettiNum
    })
}

function summonEmojiConfetti(emojis, emojiSize, confettiNum) {
    // Small, 35 = Normal, 45 = Big = 65

    jsConfetti.addConfetti({
        emojis: emojis,
        emojiSize: emojiSize,
        confettiNumber: confettiNum
    })
}

function openPopup() {
    let background = document.createElement("div")
    background.style = "background-color: #000; opacity: 0.5; width: 100vw; height: 100vw; position: absolute; left: 0; top: 0; animation: fadein 0.5s"
    document.body.appendChild(background)

    let popup = document.createElement("div")
    popup.style = "position: absolute; left: 25vw; top: 25vh; width: 55vw; height: 50vh; background-color: #fff; border-radius: 20px; color: #000; text-align: center; font-size: 2vw; animation: fadeincompletely 0.5s"

    let container = document.createElement("h2")
    container.innerText = "Create Assignment"

    let timeText = document.createElement("p")
    timeText.style = "font-size: 1.25vw"
    timeText.innerText = "Time it takes to complete assigment:"

    let timeInput = document.createElement("input")
    timeInput.classList.add("popupdate")

    let nameText = document.createElement("p")
    nameText.style = "font-size: 1.25vw"
    nameText.innerText = "Name:"

    let nameInput = document.createElement("input")
    nameInput.classList.add("popupdate")

    let button = document.createElement("button")
    button.classList.add("popup")
    button.innerText = "Create Assignment"
    
    popup.appendChild(button)
    popup.appendChild(container)
    popup.appendChild(timeText)
    popup.appendChild(timeInput)
    popup.appendChild(nameText)
    popup.appendChild(nameInput)
    document.body.appendChild(popup)

    button.onclick = () => {
        if (isNumeric(timeInput.value)) {
            newVirtualAssignment(nameInput.value, false, timeInput.value)
            popup.remove()
            background.remove()
        } else {
            timeText.innerText = "Error! Not a number!"
            sleep(2000).then(() => { timeText.innerText = "Time it takes to complete assigment:" })
        }
    }
}

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

setInterval(function() {
    save(pdata)
    levelUpCheck()
    saveList("assignments", assignments)
}, 1000)
// Move saving to new loop with time of 60000

// document.addEventListener("contextmenu", e => e.preventDefault())