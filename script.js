let dat = {
    "assignment1": "crackhead",
    "assignment2": "crackhead(v2)"
}

let entries = document.querySelectorAll(".entry")

for (let i = 0; i < entries.length; i++) {
    entries[i].onclick = () => {
        entries[i].class.replace(" unchecked", " checked ")
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