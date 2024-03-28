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

let inptxt = document.querySelector(".inptxt")
let levelTXT = document.querySelector(".level")
let expTXT = document.querySelector(".exp")
let cooldown = false

const jsConfetti = new JSConfetti()

if (loadList("assignments")) {
    let loadedData = loadList("assignments")

    for (var i = 0; i < loadedData.length; i++) {
        let val = loadedData[i]
        assignments.push([val[0], val[1], parseInt(val[2]), i])
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
    increaseExp(time)

    summonColorfulConfetti([
        "#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"
    ], 8, time * 10)

    // summonEmojiConfetti([
    //     "💀"
    // ], 45, time * 5)
}

function uncompleteAssignment(time) {
    increaseExp(time * -1)
}

function increaseExp(amount) {
    pdata["exp"] += amount

    while (pdata["exp"] >= pdata["level"]) {
        pdata["exp"] -= pdata["level"]
        pdata["level"] += 1
    }
    
    while (pdata["exp"] < 0) {
        pdata["level"] -= 1
        pdata["exp"]  += pdata["level"]
    }

    levelTXT.textContent = "Level: " + pdata["level"]
    expTXT.textContent = "Exp: " + pdata["exp"]
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
        if (!cooldown) {
            cooldown = true

            if (assignments[vassignmenti][1] == false) {
                assignments[vassignmenti][1] = true
                assignment.classList.replace("unchecked", "checked")
                completeAssignment(parseInt(time))
            } else {
                assignments[vassignmenti][1] = false
                assignment.classList.replace("checked", "unchecked")
                uncompleteAssignment(parseInt(time))
            }

            sleep(250).then(() => { cooldown = false })
        }
    }

    let ex = document.createElement("span")
    ex.classList = "x"

    ex.onclick = () => {
        assignment.remove()
    }

    assignment.appendChild(ex)
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

    let nameText = document.createElement("p")
    nameText.style = "font-size: 1.35vw"
    nameText.innerText = "Name:"

    let nameInput = document.createElement("input")
    nameInput.classList.add("popupdate")

    let timeText = document.createElement("p")
    timeText.style = "font-size: 1.35vw"
    timeText.innerText = "Time it takes to complete assigment (minutes):"

    let timeInput = document.createElement("input")
    timeInput.classList.add("popupdate")

    let button = document.createElement("button")
    button.classList.add("popup")
    button.innerText = "Create Assignment"
    
    popup.appendChild(button)
    popup.appendChild(container)
    popup.appendChild(nameText)
    popup.appendChild(nameInput)
    popup.appendChild(timeText)
    popup.appendChild(timeInput)
    document.body.appendChild(popup)

    button.onclick = () => {
        if (isNumeric(timeInput.value)) {
            newVirtualAssignment(nameInput.value, false, timeInput.value)
            popup.remove()
            background.remove()
        } else {
            timeText.innerText = "Error! Not a number!"
            sleep(1500).then(() => { timeText.innerText = "Time it takes to complete assigment:" })
        }
    }

    background.onclick = () => {
        popup.remove()
        background.remove()
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
    saveList("assignments", assignments)
}, 1000)

// document.addEventListener("contextmenu", e => e.preventDefault())