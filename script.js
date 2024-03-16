let dat = {
    "assignment1": "crackhead",
    "assignment2": "crackhead(v2)"
}

function save(data) {
    for (var key in data) {
        let val = dict[key]
        localStorage.setItem(key, val)
    }
}

function load() {
    
}