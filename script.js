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
let colors = ["lime", "red", "blue", "yellow"]

for (let i = 0; i < entries.length; i++) {
    makeAssignmentClickable(entries[i])
}

addEntry.onclick = () => {
    newAssignment(inptxt.value)
}

if (loadList("assignments")) {
    let loadedData = loadList("assignments")

    for (var i = 0; i < loadedData.length; i++) {
        newAssignment(loadedData[i])
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
        localStorage.setItem(name + i, list[i])
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

function clear() {
    localStorage.clear()
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min
}

function completeAssignment(time) {
    pdata["exp"] = pdata["exp"] + time

    summonConfetti()
}

function newAssignment(name) {
    let assignment = document.createElement("div")
    assignment.classList = "entry unchecked"

    assignment.innerHTML += name

    document.body.appendChild(assignment)

    makeAssignmentClickable(assignment)
}

function levelUpCheck() {
    while (pdata["exp"] >= pdata["level"]) {
        pdata["exp"] = pdata["exp"] - pdata["level"]
        pdata["level"] = pdata["level"] + 1
    }
}

function summonConfetti() {
    for (let i = 0; i < rand(35, 150); i++) {
        let tmpcon = document.createElement("div")
        tmpcon.classList = "confetti"

        sleep(rand(rand(1, 100), rand(600, 1000))).then(() => { document.body.appendChild(tmpcon); });

        tmpcon.style = "left: " + rand(0, 100).toString() + "vw" + "; background-color: " + colors[rand(0, colors.length - 1)] + ";"

        sleep(5000).then(() => { tmpcon.remove() })
    }
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

    let assignmentList = []
    let uentries = document.querySelectorAll(".entry")

    for (let i = 0; i < uentries.length; i++) {
        assignmentList.push(uentries[i].textContent)
    }    

    saveList("assignments", assignmentList)
}, 1000)

 // Move saving to new loop with time of 60000

// document.addEventListener("contextmenu", e => e.preventDefault())