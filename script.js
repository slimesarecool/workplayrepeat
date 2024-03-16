let pdata = {
    level: 1,
    exp: 0
}

if (load("level")) {
    pdata["level"] = parseInt(load("level"))
    pdata["exp"] = parseInt(load("exp"))
}

let entries = document.querySelectorAll(".entry")

// Confetti code
// let colors = ["lime", "red", "blue", "yellow"]

// for (let i = 0; i < 1000; i++) {
//     let tmpcon = document.createElement("div")
//     tmpcon.classList = "confetti"

//     document.body.appendChild(tmpcon)

//     tmpcon.style = "left: " + rand(0, 100).toString() + "vw" + "; background-color: " + colors[rand(0, colors.length - 1)]
// }

for (let i = 0; i < entries.length; i++) {
    entries[i].onclick = () => {
        if (Object.values(entries[i].classList).indexOf('unchecked') > -1) {
            entries[i].classList.replace("unchecked", "checked")

            completeAssignment(30)
        } else {
            entries[i].classList.replace("checked", "unchecked")
        }
    }
}

function save() {
    for (var key in pdata) {
        let val = pdata[key]
        localStorage.setItem(key, val)
    }
}

function load(name) {
    return localStorage.getItem(name)
}

function clear() {
    localStorage.clear()
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min
}

function completeAssignment(time) {
    pdata["exp"] = pdata["exp"] + time
    levelUpCheck()
}

function levelUpCheck() {
    while (pdata["exp"] >= pdata["level"]) {
        pdata["exp"] = pdata["exp"] - pdata["level"]
        pdata["level"] = pdata["level"] + 1
    }
}

setInterval(function() {
    save()
    console.log("Data Saved!")
    console.log(load("level"))
    console.log(load("exp"))
}, 1000) // Supposed to be 60000

// document.addEventListener("contextmenu", e => e.preventDefault())