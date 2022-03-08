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
    outputElement.innerHTML = '';

    for (const item of items) {

        const taskContainerEl = document.createElement('div');

        const toggleDoneInputEl = document.createElement('input');
        toggleDoneInputEl.setAttribute('type', 'checkbox');

        const taskTextContainerEl = document.createElement('span'); // change to div?
        // Conditionally wrap the text in a strikethrough tag:
        //if (item['done'] === true) {
        //    taskTextContainerEl.innerHTML = `<s>${item['task']}</s>`;
        //} else {
            taskTextContainerEl.innerHTML = item['task'];
        //}

        const deleteButtonEl = document.createElement('input');
        deleteButtonEl.setAttribute('type', 'button');
        deleteButtonEl.setAttribute('value', 'X');

        taskContainerEl.append(toggleDoneInputEl);
        taskContainerEl.append(taskTextContainerEl);
        taskContainerEl.append(deleteButtonEl);

        outputElement.append(taskContainerEl);

        /*  Get the index in the array of the current item:
            (indexOf *seems* to be a safe/reliable way to do this?
            i.e. it won't confuse "superficially identical" elements.)
        */
        const currentItemIndex = items.indexOf(item);

        /*  If you want to have each eventListener function complete by calling
            some function to "update the DOM", you'll probably need to have
            an "updateTask" function (which takes an item as a parameter),
            which would then be called by updateDisplay for each item in a given list.
            (This means that the eventListener functions can ask to just "redraw"
            that one task, then the item is changed, rather than redraw the entire list.)

            For now: just manipulate the DOM immediately and directly!
        */

        // Contents of these arrow functions could be moved to separate (named) functions:

        toggleDoneInputEl.addEventListener("input", () => {
            /*  You can address the item directly if you change the class method to:

                toggleItemDone(item) {
                    item["done"] = !item["done"];
                }

                And call it like this here:

                list.toggleItemDone(item);

                But for now, just use the established index method.
            */
            list.toggleItemDone(currentItemIndex);
            // Add the "done" class to this task's text container:
            taskTextContainerEl.classList.toggle('done');
            // Conditionally wrap the text in a strikethrough tag:
            if (item['done'] === true) {
                taskTextContainerEl.innerHTML = `<s>${taskTextContainerEl.innerHTML}</s>`;
            } else {
                taskTextContainerEl.innerHTML = taskTextContainerEl.innerText;
            }
            // Is calling the whole parent function from here a good idea?!
            //updateDisplay(list);
        });

        deleteButtonEl.addEventListener("click", () => {
            taskContainerEl.remove();
            list.deleteItem(currentItemIndex);
            //updateDisplay(list);
        });

    }

}

// Temporary test data:
const testList = new ToDoList();

testList.addItem("Hello world");
testList.addItem("Clear out the garden shed");
testList.addItem("Just a test item");
testList.addItem("Hello world"); // intentional duplicate

updateDisplay(testList);