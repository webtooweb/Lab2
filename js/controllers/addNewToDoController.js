import { addToDo } from '../models/toDoListModel.js'; 

let dialog;
let closeButton;
let exitButton;
let form;

export function addNewToDoController() {
    dialog = document.querySelector('#create-to-do'); 
    exitButton = document.querySelector('#exit-create'); 
    closeButton = dialog.querySelector('#close'); 
    form = dialog.querySelector('form'); 

    configureListeners();
    dialog.showModal();
}

function configureListeners() {
    exitButton.addEventListener('click', onCloseDialog);
    closeButton.addEventListener('click', onCloseDialog);
    form.addEventListener('submit', onAddNewToDo);
}


function onAddNewToDo(e) {
    e.preventDefault();
    const todoInput = e.currentTarget.querySelector('#todo'); 
    const categoryInput = e.currentTarget.querySelector('#category'); 
    const statusInput = e.currentTarget.querySelector('#status'); 

 
    const todo = todoInput.value.trim();
    const category = categoryInput.value.trim();
    const status = statusInput.value.trim();


    addToDo({
        todo,
        category,
        status,
    });

    todoInput.value = ''; 
    categoryInput.value = ''; 
    statusInput.value = ''; 

    onCloseDialog();
}










function onCloseDialog() {
    dialog.close();
}
