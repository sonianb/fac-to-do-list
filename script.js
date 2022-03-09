'use strict';

const taskInput = document.getElementById('task');
const submitBtn = document.getElementById('submit-btn')

//data structure
class ToDoList {

    /**
     * Constructor creates a to-do list using local storage, if needed.
     * If items exist in local storage, initialise toDos using the saved values from local storage, if it doesn't create empty array.
     * @param {*} useLocalStorage boolean, determines whether local storage should be used
     */

    constructor(useLocalStorage) {
        const tempTodo = localStorage.getItem('to-do-list')
        if (useLocalStorage && tempTodo) { //if item exists, do JSONparse to transform to obj to initialise in toDos
            this.toDos = JSON.parse(tempTodo);
        } else {
            this.toDos = [];
        }
    }

    addItem(taskContent) {
        this.toDos.push({task: taskContent, done: false, date: new Date()});
        this.saveToLocalStorage();
    }
    deleteItem(index) {
        this.toDos.splice(index, 1);
        this.saveToLocalStorage();
    }
    getDoneItems() {
        return this.toDos.filter(elem => elem.done === true)
    }
    getAllItems() {
        return this.toDos;
    }
    toggleItemDone(index) {
        this.toDos[index]["done"] = !this.toDos[index]["done"];
        this.saveToLocalStorage();
    }
    saveToLocalStorage() {
        window.localStorage.setItem("to-do-list", JSON.stringify(this.toDos))
    }
}

const toDoList = new ToDoList(true);

// Joe: update display/DOM

// Joe: update item in toDoList (to set it as "done")

// (Stretch goal: hide completed items)

/*

    Add, update and delete functions *only* change the array.
    (They only change the data that we're storing.)

    The "update display" function *only* modifies the DOM.
    (It always reads the most up-to-date data that we're storing, and updates the DOM using that.)

    When they've finished changing the array, the add, update, and delete functions
    will always call the update display function.

    test("addTask() should add a new object to the toDoList array", () => {
        ...
    });

    function addTask(task) {
        ...
    }

*/

