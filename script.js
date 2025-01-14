'use strict';

//data structure
class ToDoList {

    /**
     * Constructor creates a to-do list using local storage, if needed.
     * If items exist in local storage, initialise toDos using the saved values from local storage, if it doesn't create empty array.
     * @param {*} useLocalStorage boolean, determines whether local storage should be used
     */

    constructor(listName, useLocalStorage) {
        this.useLocalStorage = useLocalStorage;
        this.listName = listName;
        // A listName must be provided to make use of local storage
        if (listName) {
            const tempTodo = localStorage.getItem(listName);
            if (useLocalStorage && tempTodo) { //if item exists, do JSONparse to transform to obj to initialise in toDos
                this.toDos = JSON.parse(tempTodo);
            } else {
                // If a listName is provided but there's no localStorage data, set up an empty
                // array for this todo list:
                this.toDos = [];
            }
        } else {
            // If no listName is provided, set up an empty array for this todo list:
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
        // Check if useLocalStorage is enabled for this instance, so we only save to
        // local storage if the list requests it.
        if (this.useLocalStorage) {
            window.localStorage.setItem(this.listName, JSON.stringify(this.toDos))
        }
    }
}

// Currently we set up one default list, but it would be relatively straightforward
// to add functionality to allow the user to create multiple lists.
const defaultListIdentifier = 'toDoList';
window[defaultListIdentifier] = new ToDoList('defaultList', true);


function updateDisplay(list) {

    const outputElement = document.querySelector('section');
    const items = list.getAllItems();
    outputElement.innerHTML = '';

    const listElement = document.createElement('ul');
    listElement.innerHTML = '';

    items.forEach((item, index) => {

        // Only do stuff if this item isn't marked as done, or it is but the done filter is off
        if ((item.done === false) || (item.done === true && myFilterControl.checked === false)) {

            const taskContainerEl = document.createElement('li');
            taskContainerEl.classList.add('list-items');

            const toggleDoneInputEl = document.createElement('input');
            toggleDoneInputEl.setAttribute('type', 'checkbox');
            //toggleDoneInputEl.classList.add('list-item-toggle-done');

            const taskTextContainerEl = document.createElement('div'); // change to div?
            taskTextContainerEl.classList.add('list-item-text');

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
            deleteButtonEl.classList.add('deleteBtn')
            deleteButtonEl.setAttribute('value', '—');
            deleteButtonEl.setAttribute('aria-label', 'Delete item')

            taskContainerEl.append(toggleDoneInputEl);
            taskContainerEl.append(taskTextContainerEl);
            taskContainerEl.append(deleteButtonEl);

            listElement.append(taskContainerEl);

            toggleDoneInputEl.addEventListener("input", () => {
                list.toggleItemDone(index);
                /*  This "redraws" everything (for this list), every time an item is toggled as done.
                    Not necessarily the best approach, but it probably only matters if there are
                    *lots* of items on the list, and the user agent is low on resources?
                */
                updateDisplay(list);
            });

            deleteButtonEl.addEventListener("click", () => {
                list.deleteItem(index);
                updateDisplay(list);
            });

        }

    });

    outputElement.append(listElement);

}


function objFromFormData(form) {
    const myFormData = new FormData(form);
    return (Object.fromEntries(myFormData));
}


function handleFormInput(form) {

    const myData = objFromFormData(form);

    // The list to use can be specified by a (hidden) form input, name=list.
    // If that's not specified, we use the default set above.
    const listToUse = myData.list || defaultListIdentifier;

    window[listToUse].addItem(myData.task);

    // Empty the input
    document.querySelector('#task').value = '';

    updateDisplay(window[listToUse]);

}


const myForm = document.querySelector('form');

myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleFormInput(event.target);
});


const myFilterControl = document.querySelector('#filter');

myFilterControl.addEventListener('input', (event) => {
    // Get the form that this filter control belongs to:
    const myForm = event.target.form;
    const myData = objFromFormData(myForm);
    // Again, either use a specified list, or default:
    const listToUse = myData.list || defaultListIdentifier;
    updateDisplay(window[listToUse]);
});


// Call this on page load, so that a saved list is displayed if it exists
updateDisplay(window[defaultListIdentifier]);