import "./scss/style.scss"

const input = document.getElementById("input");
const inputBox = document.getElementById("input-box");
const inputTitle = document.getElementById("input-title");
const inputNote = document.getElementById("input-note");
const inputContent = document.getElementById("input-content");

const notesWrapper = document.getElementById("notes-wrapper");
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

document.addEventListener("click",(e) => {
    if(!(inputBox.contains(e.target))){
        if(inputContent.childElementCount != 0){
            addNote();
        }
    }
})


function prepareNotes(){
    if(inputNote.value != ''){
        const note = inputNote.value;

        const p = document.createElement('p');
        p.innerText = note;
        p.classList.add("input-content-note");
        inputContent.appendChild(p);
        inputContent.style.display = "block";
        inputNote.value = '';
    }
}


function addNote(){
    //create every div / subdiv
    const divNoteBox = document.createElement('div');
    divNoteBox.classList.add("note-box");

    const divNoteTitleWrapper = document.createElement('div');
    divNoteTitleWrapper.classList.add("note-title-wrapper");

    const divNoteTitle = document.createElement('div');
    divNoteTitle.classList.add("note-title");
    divNoteTitle.innerText = inputTitle.value;

    const divNoteDeleteIcon = document.createElement('div');
    divNoteDeleteIcon.classList.add("note-delete-icon");

    const deleteIcon = document.createElement('i')
    deleteIcon.classList.add("fas");
    deleteIcon.classList.add("fa-trash-alt");

    const divNoteContentWrapper = document.createElement('div');
    divNoteContentWrapper.classList.add("note-content-wrapper");

    //append divs to each other

    divNoteBox.appendChild(divNoteTitleWrapper);
    divNoteDeleteIcon.appendChild(deleteIcon);
    divNoteTitleWrapper.appendChild(divNoteTitle);
    divNoteTitleWrapper.appendChild(divNoteDeleteIcon);
    divNoteBox.appendChild(divNoteContentWrapper);

    //append notes
    const inputContentNotes = document.querySelectorAll('.input-content-note');
    
    for(let i = 0; i < inputContentNotes.length; i++) {
        const divNote = document.createElement('div');
        divNote.classList.add("note");
        divNote.setAttribute("id", i+1);
        divNote.innerText = inputContentNotes[i].innerText;

        divNoteContentWrapper.appendChild(divNote);
    }

    // append note box to wrapper div, clear input fields
    notesWrapper.appendChild(divNoteBox);
    inputTitle.innerText = '';
    inputNote.innerText = '';
    inputContent.innerText = '';
    inputContent.style.display = "none";
}