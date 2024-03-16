let dat = {
    "assignment1": "crackhead",
    "assignment2": "crackhead(v2)"
}

let entries = document.querySelectorAll(".entry")

for (let i = 0; i < entries.length; i++) {
    entries[i].onclick = () => {
        if (entries[i].classList.includes("unchecked")) {
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

// document.addEventListener("contextmenu", e => e.preventDefault())