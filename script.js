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
    const outputElement = document.querySelector('section');
    const items = list.getAllItems();
    //let html = '';
    for (const item of items) {

        const newTaskDiv = document.createElement('div');

        const newDoneCheckbox = document.createElement('input');
        newDoneCheckbox.setAttribute('type', 'checkbox');

        const newTaskTextDiv = document.createElement('span'); // change to div...
        newTaskTextDiv.innerHTML = item.task;

        const newDeleteButton = document.createElement('input');
        newDeleteButton.setAttribute('type', 'button');
        newDeleteButton.setAttribute('value', 'X');

        newTaskDiv.append(newDoneCheckbox);
        newTaskDiv.append(newTaskTextDiv);
        newTaskDiv.append(newDeleteButton);

        outputElement.append(newTaskDiv);

        // Now you can add event listeners for the checkbox and button at the same time

/*
        html += `
<div class="task">
    <input type="checkbox">
    ${item.task}
    <input type="button" value="X">
</div>
`;
*/
    }
    // outputElement.innerHTML = html;
}

const testList = new ToDoList();

testList.addItem("Hello world");
testList.addItem("Clear out the garden shed");
testList.addItem("Just a test item");

updateDisplay(testList);