let notes = [];

const main = document.querySelector("main");
const modal = document.querySelector(".overlay");
const form = modal.querySelector("form");

const openModal = (data = []) => {
    if (data.length !== 0) {
        form.id.value = data.id;
        form.title.value = data.title;
        form.body.value = data.body;
        form.color.value = data.color;
    }
    modal.classList.add("show");
    setTimeout( () => {
        form.title.focus();
    }, 500)
}

const closeModal = () => {
    resetFormErrors();
    form.reset();
    modal.classList.remove("show");
}

const resetFormErrors = () => {
    form.querySelectorAll(".invalid").forEach((item) => item.classList.remove("invalid"));
}

const saveNote = (event) => {
    event.preventDefault();
    resetFormErrors();
    
    // let form = modal.querySelector("form");

    if (form.title.value === "" || form.title.value.length < 3) {
        form.title.classList.add("invalid");
        form.title.focus();
        return false;
    }

    if (form.body.value === "" || form.body.value.length < 5) {
        form.body.classList.add("invalid");
        form.body.focus();
        return false;
    }

    if (form.id.value === "") {
        note = {
            id : new Date().getTime(),
            title : form.title.value,
            body : form.body.value,
            color : form.color.value
        }
        notes.push(note);
    } else {
        let noteIndex = notes.findIndex( (item) => item.id == form.id.value);
        if (noteIndex > -1) {
            notes[noteIndex].title = form.title.value;
            notes[noteIndex].body  = form.body.value;
            notes[noteIndex].color = form.color.value;
        }
    }

    storeData();
    closeModal();
    render();
}

const deleteNote = (id) => {
    let noteIndex = notes.findIndex( (item) => item.id === id);
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
        storeData();
        render();
    }
}

const formatNote = (body) => {
    return  body.replace(/\*(\S[^\*]+\S)\*/g, "<strong>$1</strong>")
                .replace(/\_(\S[^\_]+\S)\_/gm, "<em>$1</em>")
                .replace(/\-(\S[^\-]+\S)\-/gm, "<s>$1</s>")
                .replace(/^\-\s(.+)$/gm, "<li>$1</li>")
                .replace(/(\n\n)/gm, "<br/><br/>")
}

const editNote = (id) => {
    let note = notes.find( item => item.id === id );
    if (note) {
        openModal(note);
    }
}

const render = (event) => {
    main.innerHTML = "";

    let storeredData = localStorage.getItem("notes");
    if (storeredData) {
        notes = JSON.parse(storeredData);
    }

    if (event && event.target.value.length > 3) {
        let search = notes.filter( (note) => {
            if (note.title.match(new RegExp(event.target.value, 'gi')) || note.body.match(new RegExp(event.target.value, 'gi'))) {
                return true;
            }
        });

        search.forEach( (item) => {
            let note = `<div class="note" id="${item.id}" style="--js-color: ${item.color}">
                            <div class="note__body">
                                <h2>${item.title}</h2>
                                <p>${formatNote(item.body)}</p>
                            </div>
                            <div class="note__toolbar">
                                <button type="button" title="Editar esta nota" onclick="editNote(${item.id})"><i class="fa-solid fa-pen"></i></button>
                                <button type="button" title="Excluir esta nota" onclick="deleteNote(${item.id})"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>`;
            main.innerHTML += note;
        })

        return;
    }

    notes.forEach( (item) => {
        let note = `<div class="note" id="${item.id}" style="--js-color: ${item.color}">
                        <div class="note__body">
                            <h2>${item.title}</h2>
                            <p>${formatNote(item.body)}</p>
                        </div>
                        <div class="note__toolbar">
                            <button type="button" title="Editar esta nota" onclick="editNote(${item.id})"><i class="fa-solid fa-pen"></i></button>
                            <button type="button" title="Excluir esta nota" onclick="deleteNote(${item.id})"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>`;
        main.innerHTML += note;
    })

}

const storeData = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
        closeModal();
    }
})

render();