let pdata = {
    level: 1,
    exp: 0
}

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
// let colors = ["lime", "red", "blue", "yellow", "fuchsia", "aqua"]

const jsConfetti = new JSConfetti()

for (let i = 0; i < entries.length; i++) {
    makeAssignmentClickable(entries[i])
}

addEntry.onclick = () => {
    if (! inptxt.value == "") {
        newAssignment(inptxt.value)
        inptxt.value = ""
    }
}

if (loadList("assignments")) {
    let loadedData = loadList("assignments")
    let loadedDataChecked = loadListChecked("assignments")

    for (var i = 0; i < loadedData.length; i++) {
        let checked = false

        if (loadedDataChecked[i] == "checked") {
            checked = true
        }

        newAssignment(loadedData[i], checked)
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

    // summonColorfulConfetti([
    //     "#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"
    // ], 8, time * 10)

    summonEmojiConfetti([
        "💀"
    ], 65, time * 5)
}

function uncompleteAssignment(time) {
    pdata["exp"] -= time
}

function newAssignment(name, checked) {
    let assignment = document.createElement("div")
    if (checked) {
        assignment.classList = "entry checked"
    } else {
        assignment.classList = "entry unchecked"
    }

    assignment.innerHTML += name

    document.body.appendChild(assignment)

    makeAssignmentClickable(assignment)
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
}

// Old confetti code
// function summonConfetti() {
//     for (let i = 0; i < rand(35, 150); i++) {
//         let tmpcon = document.createElement("div")
//         tmpcon.classList = "confetti"

//         sleep(rand(rand(1, 100), rand(600, 1000))).then(() => { document.body.appendChild(tmpcon); });

//         tmpcon.style = "left: " + rand(0, 100).toString() + "vw" + "; background-color: " + colors[rand(0, colors.length - 1)] + ";"

//         sleep(5000).then(() => { tmpcon.remove() })
//     }
// }

function summonColorfulConfetti(colors, confettiSize, confettiNum) {
    jsConfetti.addConfetti({
        confettiColors: colors,
        confettiRadius: confettiSize,
        confettiNumber: confettiNum
    })
}

function summonEmojiConfetti(emojis, emojiSize, confettiNum) {
    jsConfetti.addConfetti({
        emojis: emojis,
        emojiSize: emojiSize,
        confettiNumber: confettiNum
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function makeAssignmentClickable(entry) {
    entry.onclick = () => {
        if (Object.values(entry.classList).indexOf('unchecked') > -1) {
            entry.classList.replace("unchecked", "checked")

            completeAssignment(30)
        } else {
            entry.classList.replace("checked", "unchecked")

            uncompleteAssignment(30)
        }
    }

    let ex = document.createElement("div")
    ex.classList = "x"

    ex.onclick = () => {
        entry.remove()
    }

    entry.appendChild(ex)
}

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

    if (uentries.length > 6) {
        document.body.style.overflowY = "visible"
    }
}, 1000)

// Move saving to new loop with time of 60000

// document.addEventListener("contextmenu", e => e.preventDefault())