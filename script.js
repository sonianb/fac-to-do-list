'use strict';

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
        this.toDos[index].done = !this.toDos[index].done;
        this.saveToLocalStorage();
    }
    saveToLocalStorage() {
        window.localStorage.setItem("to-do-list", JSON.stringify(this.toDos))
    }
}

// Currently we set up one default list, but it would be relatively straightforward
// to add functionality to allow the user to create multiple lists.
const toDoList = new ToDoList(true);


function updateDisplay(list) {

    const outputElement = document.querySelector('section');
    const items = list.getAllItems();
    outputElement.innerHTML = '';

    for (const item of items) {

        const taskContainerEl = document.createElement('div');

        const toggleDoneInputEl = document.createElement('input');
        toggleDoneInputEl.setAttribute('type', 'checkbox');

        const taskTextContainerEl = document.createElement('span'); // change to div?

        // If the item's done flag is set to true:
        if (item.done === true) {
            // Wrap the text in a strikethrough tag:
            taskTextContainerEl.innerHTML = `<s>${item.task}</s>`;
            // Check the checkbox:
            toggleDoneInputEl.setAttribute('checked', 'on');
            // Add the "done" class to this task's text container:
            taskTextContainerEl.classList.add('done');
        } else {
            // If not, then don't wrap the text in a strikethrough tag:
            taskTextContainerEl.innerHTML = item.task;
            /*  (There's no need to remove the "done" class or uncheck the checkbox,
                as the class isn't assigned by default, and the checkbox is unchecked by default.)
            */

        }

        const deleteButtonEl = document.createElement('input');
        deleteButtonEl.setAttribute('type', 'button');
        deleteButtonEl.setAttribute('value', 'X');

        taskContainerEl.append(toggleDoneInputEl);
        taskContainerEl.append(taskTextContainerEl);
        taskContainerEl.append(deleteButtonEl);

        outputElement.append(taskContainerEl);

        toggleDoneInputEl.addEventListener("input", () => {
            /*
                indexOf *seems* to be a safe/reliable way to do this?
                (i.e. it won't confuse "seemingly-identical" elements.)

                Could we set this const outside of this function (i.e. in the parent scope)?
                It might cause problems (because if we delete an item's element from the array,
                its index will change, so that will quickly get out of sync).

                But given we updateDisplay on every event anyway, might it work?
            */
            const currentItemIndex = items.indexOf(item);
            list.toggleItemDone(currentItemIndex);

            /*  This "redraws" everything (for this list), every time an item is toggled as done.
                Not necessarily the best approach, but it probably only matters if there are
                *lots* of items on the list, and the user agent is low on resources?
            */
            updateDisplay(list);
        });

        deleteButtonEl.addEventListener("click", () => {
            const currentItemIndex = items.indexOf(item);
            list.deleteItem(currentItemIndex);
            updateDisplay(list);
        });

    }

}


function handleFormInput(form) {

    const myFormData = new FormData(form);

    const myData = Object.fromEntries(myFormData);

    toDoList.addItem(myData.task);

    // Empty the input
    form.reset();

    updateDisplay(toDoList);

}


const myForm = document.querySelector('form');

myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleFormInput(event.target);
});


// Call this on page load, so that a saved list is displayed if it exists
updateDisplay(toDoList);