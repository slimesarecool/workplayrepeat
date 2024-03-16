let dat = {
    "level": 1,
    "exp": 0
}

let entries = document.querySelectorAll(".entry")

for (let i = 0; i < 10; i++) {
    let tmpcon = document.createElement("div")
    tmpcon.classList = "confetti"

    document.body.appendChild(tmpcon)

    getComputedStyle(tmpcon).setProperty("--pos", rand(0, 100).toString() + "vw")
}

for (let i = 0; i < entries.length; i++) {
    entries[i].onclick = () => {
        if (Object.values(entries[i].classList).indexOf('unchecked') > -1) {
            entries[i].classList.replace("unchecked", "checked")
        } else {
            entries[i].classList.replace("checked", "unchecked")
        }
    }
}

function save(data) {
    for (var key in data) {
        let val = data[key]
        localStorage.setItem(key, val)
    }
}

function load(name) {
    return localStorage.getItem(name)
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}  

// document.addEventListener("contextmenu", e => e.preventDefault())