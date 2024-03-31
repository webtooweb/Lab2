import {toDoItemTemplate} from '../templates/toDoItemTemplate'
import {subscribe} from '../models/toDoListModel'
import { deleteToDoController } from '../controllers/deleteToDoController';

document.addEventListener('click', function(event) {
    if (event.target.id === 'delete') {
        const uid = event.target.dataset.uid;
        deleteToDoController(uid);
    }
});


let view

export function toDoListView() {
  view = document.querySelector('#to-do-list')
  view.addEventListener('click', onHandleClick)

}

subscribe(render)

function render(data) {
    const div = document.createElement('div')
    const toDoList = document.querySelector('#item-container')
    toDoList.replaceChildren()
    data.forEach((item) => {
       div.prepend(toDoItemTemplate(item))
    })
    toDoList.append(div)
}

function onHandleClick(e) {
    switch (e.target.id) {
        case 'delete':
         deleteToDoController(e.target.dataset.uid)
         break
        case 'edit':
          console.log(e.target.dataset.uid)
          updateToDoController(e.target.dataset.uid)
          break
           case 'add':
      
           addNewToDoController();
           break;
      default:
        null    
  }
}
// document.addEventListener('DOMContentLoaded', toDoListView);