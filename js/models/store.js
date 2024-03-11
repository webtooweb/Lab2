let store 
let instance

const createStore = async (todos) => {
    if (instance) {
        throw new Error('New instance cannot be created!')

    }
    instance = 1;
    store = todos;

    if (store.length) {
        return true
    }
};

const getStore = () => {
    return store
}
const removeFromStore = (uid) => {
    store = store.filter((item) => item.uid !== uid)
    return store
}

export {getStore, createStore, removeFromStore};