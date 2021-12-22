import "./scss/style.scss"

const input = document.getElementById("input");
const inputBox = document.getElementById("input-box");
const inputTitle = document.getElementById("input-title");
const inputNote = document.getElementById("input-note");
const inputContent = document.getElementById("input-content");

// const notesWrapper = document.getElementById("notes-wrapper");
// const notesWrapper = document.getElementById("note-box");
// const notesWrapper = document.getElementById("note-title-wrapper");
// const notesWrapper = document.getElementById("note-title");
// const notesWrapper = document.getElementById("note-delete-icon");
// const notesWrapper = document.getElementById("note-content-wrapper");



inputNote.addEventListener("keypress",(e) => {
    if ('Enter' === e.key){
       prepareNotes();
    }
});

function prepareNotes(){
    if(inputNote.value != ''){
        const note = inputNote.value;

        const p = document.createElement('p');
        p.innerText = note;
        inputContent.appendChild(p);
        inputNote.value = '';
    }
}