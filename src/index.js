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

const LOCAL_STORAGE_KEY = "todo.tasks";
let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
    [
        {
            "Title" : "Example Title",
        },
        [{
            "Note" : "Example Note, incomplete",
            "Status": "incomplete"
        },
        {
            "Note" : "Example Note, complete",
            "Status": "complete"
        },
        ]
    ]
];
renderNotes();

inputNote.addEventListener("keypress",(e) => {
    if ('Enter' === e.key){
       prepareNotes();
    }
});

document.addEventListener("click",(e) => {
    if(!(inputBox.contains(e.target))){
        if(inputContent.childElementCount != 0){
            addToLocalStorage()
        }
    }
})

//Prepare the notes before adding them to the finalized Note Box
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


function addToLocalStorage(){
    const title = inputTitle.value;
    const notesArr = [];
    const inputContentNotes = document.querySelectorAll('.input-content-note');

    inputContentNotes.forEach(item => {
        let note = item.innerText;
        let notes = {
            "Note" : note,
            "Status": "incomplete"
        }

        notesArr.push(notes);
    });
    
    const task = [
        {
            "Title" : title,
        },
        notesArr
    ];

    tasks.push(task);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));

    inputTitle.value = '';
    inputNote.innerText = '';
    inputContent.innerText = '';
    inputContent.style.display = "none";

    renderNotes();
}

//Adding the prepared notes to the Note Box
function renderNotes(){
    clearNotesWrapper()
    tasks.forEach(task => {
        const title = task[0].Title;

        //create every div / subdiv
        const divNoteBox = document.createElement('div');
        divNoteBox.classList.add("note-box");

        const divNoteTitleWrapper = document.createElement('div');
        divNoteTitleWrapper.classList.add("note-title-wrapper");

        const divNoteTitle = document.createElement('div');
        divNoteTitle.classList.add("note-title");
        divNoteTitle.innerText = title;

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
        
        task[1].forEach(item => {
            const divNote = document.createElement('div');
            divNote.classList.add("note");
            divNote.innerText = item.Note;
            divNote.addEventListener("click", () => {
                divNote.classList.toggle("complete");
            })
            
            if(item.Status === "complete"){
                divNote.classList.add("complete");
            }
    
            divNoteContentWrapper.appendChild(divNote);
        });
            
        // append note box to wrapper div, clear input fields
        notesWrapper.appendChild(divNoteBox);
    })
}


function clearNotesWrapper(){
    notesWrapper.innerText = '';
}
