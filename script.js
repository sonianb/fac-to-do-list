'use strict';

const taskInput = document.getElementById('task');
const submitBtn = document.getElementById('submit-btn')

//data structure
class ToDoList {
    constructor() {
        this.toDos = [
            // {
            //     task: "walk the dog",
            //     done: false,
            //     date: new Date()
            // },
            // {
            //     task: "water the plants",
            //     done: false,
            //     date: new Date()
            // }
        ]
    }

    addItem(taskContent) {
        this.toDos.push({task: taskContent, done: false, date: new Date()});
    }
    deleteItem(index) {
       this.toDos.splice(index, 1); 
    }
    getDoneItems() {
        return this.toDos.filter(elem => elem.done === true)
    }
    getAllItems() {
       return this.toDos;
    }
    toggleItemDone(index) {
        this.toDos[index]["done"] = !this.toDos[index]["done"];        
    }
}

const toDoList = new ToDoList();

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

function updateDisplay(list) {
    
}