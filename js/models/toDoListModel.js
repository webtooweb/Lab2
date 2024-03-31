import { ref, set, get, push, remove, update } from 'firebase/database';
import { db } from '../lib/firebase/config/firebaseInit';
import {createStore, removeFromStore, updateStore} from './store'

let todos = []; 
let observers = [];

export function subscribe(fn) {
    observers.push(fn);
}

export function notify() {
    observers.forEach((observer) => observer([...todos])); 
}

export async function getToDoData() {
    const dbRef = ref(db, 'todos');
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
        const payload = snapshot.val();
        todos = Object.entries(payload).map(([key, value]) => ({
            ...value,
            uid: key
        }));
        notify(); 
    } else {
        console.log('No data available');
    }
}

export function deleteToDo(uid) {
    const dbRef = ref(db, `todos/${uid}`);
    remove(dbRef).then(() => {
        todos = todos.filter(item => item.uid !== uid); 
        notify(); 
    }).catch(error => {
        console.error('Error removing to-do item:', error);
    });
}

export function updateToDo(todoToUpdate) {
    const { uid, ...updateData } = todoToUpdate; 
    const dbRef = ref(db, `todos/${uid}`);
    update(dbRef, updateData).then(() => {
        const index = todos.findIndex(item => item.uid === uid);
        if (index !== -1) {
            todos[index] = todoToUpdate; 
            notify(); 
        }
    }).catch(error => {
        console.error('Error updating to-do item:', error);
    });
}

export async function addToDo(todoItem) {
    try {
        const dbRef = ref(db, 'todos');
        const newItemRef = await push(dbRef, todoItem);
        const newItem = { ...todoItem, uid: newItemRef.key };
        todos.push(newItem); 
        notify(); 
    } catch (error) {
        console.error('Error adding new to-do item:', error);
    }
}
