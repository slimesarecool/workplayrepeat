let pdata = {
    level: 1,
    exp: 0
}

let assignments = []

// clear()

if (load("level")) {
    pdata["level"] = parseInt(load("level"))
    pdata["exp"] = parseInt(load("exp"))
}

let entries = document.querySelectorAll(".entry")
let addEntry = document.querySelector(".addentry")
let inptxt = document.querySelector(".inptxt")
let levelTXT = document.querySelector(".level")
let expTXT = document.querySelector(".exp")

const jsConfetti = new JSConfetti()

if (loadList("assignments")) {
    let loadedData = loadList("assignments")
    let loadedDataChecked = loadListChecked("assignments")
    let time = 30

    for (var i = 0; i < loadedData.length; i++) {
        let checked = false

        if (loadedDataChecked[i] == "checked") {
            checked = true
        }

        assignments.push([loadedData[i], checked, time])
    } 
}

for (var i = 0; i < assignments.length; i++) {
    let cassignment = assignments[i]

    newAssignment(cassignment[0], cassignment[1], cassignment[2])
}

addEntry.onclick = () => {
    if (! inptxt.value == "") {
        newAssignment(inptxt.value, false, 30)
        inptxt.value = ""
    }
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
        localStorage.setItem(name + i, list[i].textContent)

        if (list[i].classList.contains("checked")) {
            localStorage.setItem(name + i + "Checked", "checked")
        } else {
            localStorage.setItem(name + i + "Checked", "unchecked")
        }
    }
}

function loadList(name) {
    let listlength = localStorage.getItem(name + "Length")
    let templist = []

    for (var i = 0; i < listlength; i++) {
        templist.push(localStorage.getItem(name + i))
    }

    return templist
}

function loadListChecked(name) {
    let listlength = localStorage.getItem(name + "Length")
    let templist = []

    for (var i = 0; i < listlength; i++) {
        templist.push(localStorage.getItem(name + i + "Checked"))
    }

    return templist
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

function newAssignment(name, checked, time) {
    let assignment = document.createElement("div")
    
    if (checked) {
        assignment.classList = "entry checked"
    } else {
        assignment.classList = "entry unchecked"
    }

    assignment.innerHTML += name

    document.body.appendChild(assignment)

    makeAssignmentClickable(assignment, time)
}

// function newListAssignment(name, time) {
//     assignments.push()
// }

function levelUpCheck() {
    while (pdata["exp"] < 0) {
        pdata["level"] -= 1
        pdata["exp"]  += pdata["level"]
    }

    while (pdata["exp"] >= pdata["level"]) {
        pdata["exp"] -= pdata["level"]
        pdata["level"] += 1
    }
}

function summonColorfulConfetti(colors, confettiSize, confettiNum) {
    jsConfetti.addConfetti({
        confettiColors: colors,
        confettiRadius: confettiSize,
        confettiNumber: confettiNum
    })
}

function summonEmojiConfetti(emojis, emojiSize, confettiNum) {
    // 35 = Small, 35 = Normal, 45 = Big = 65

    jsConfetti.addConfetti({
        emojis: emojis,
        emojiSize: emojiSize,
        confettiNumber: confettiNum
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function makeAssignmentClickable(entry, time) {
    entry.onclick = () => {
        if (Object.values(entry.classList).indexOf('unchecked') > -1) {
            entry.classList.replace("unchecked", "checked")

            completeAssignment(time)
        } else {
            entry.classList.replace("checked", "unchecked")

            uncompleteAssignment(time)
        }
    }

    let ex = document.createElement("span")
    ex.classList = "x"

    ex.onclick = () => {
        entry.remove()
    }

    entry.appendChild(ex)
}

function openPopup() {
    let background = document.createElement("div")
    background.style = "background-color: #000; opacity: 0.5; width: 100vw; height: 100vw; position: absolute; left: 0; top: 0; animation: fadein 0.5s"
    document.body.appendChild(background)

    let popup = document.createElement("div")
    popup.style = "position: absolute; left: 25vw; top: 25vh; width: 50vw; height: 50vh; background-color: #fff; border-radius: 20px; color: #000; text-align: center; font-size: 2vw; animation: fadeincompletely 0.5s"

    let container = document.createElement("h2")
    container.innerText = "Create Assignment"

    let timeText = document.createElement("p")
    timeText.style = "font-size: 1.5vw"
    timeText.innerText = "Time it takes to complete assigment:"

    let timeInput = document.createElement("input")
    timeInput.classList.add("popupdate")

    let nameText = document.createElement("p")
    nameText.style = "font-size: 1.5vw"
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
}

// setInterval(function() {
//     save(pdata)

//     levelUpCheck()

//     levelTXT.textContent = "Level: " + pdata["level"]
//     expTXT.textContent = "EXP: " + pdata["exp"]

//     let assignmentList = []
//     let uentries = document.querySelectorAll(".entry")

//     for (let i = 0; i < uentries.length; i++) {
//         assignmentList.push(uentries[i])
//     }    

//     saveList("assignments", assignmentList)

//     if (uentries.length > 6) {
//         document.body.style.overflowY = "visible"
//     }
// }, 1000)
// Move saving to new loop with time of 60000

setInterval(function() {
    save(pdata)

    levelUpCheck()

    levelTXT.textContent = "Level: " + pdata["level"]
    expTXT.textContent = "EXP: " + pdata["exp"]

    let assignmentList = []
    let uentries = document.querySelectorAll(".entry")

    for (let i = 0; i < uentries.length; i++) {
        assignmentList.push(uentries[i])

    }    

    saveList("assignments", assignmentList)
}, 1000)
// Move saving to new loop with time of 60000

// document.addEventListener("contextmenu", e => e.preventDefault())