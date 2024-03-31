
import { deleteToDo } from '../models/toDoListModel';

let dialog;
let uid;

export function deleteToDoController(itemUid) {
    uid = itemUid;
    dialog = document.querySelector('#delete-to-do');
    configureListeners();
    dialog.showModal();
}

function configureListeners() {
    const exitButton = dialog.querySelector('#exit');
    const deleteButton = dialog.querySelector('#delete');

    exitButton.addEventListener('click', onCloseDialog);
    deleteButton.addEventListener('click', onRemoveToDo);
}

function onCloseDialog(e) {
    dialog.close();
}

function onRemoveToDo(e) {
    deleteToDo(uid); 
    onCloseDialog(e); 
}
