//------------------------Testing addItem method--------------------------------------

test("addItem() should add a new object to the toDos array", () => {
    const test1 = new ToDoList();
    equal(test1.toDos.length, 0) //check size before adding an item
    test1.addItem("I want to buy tomatoes"); //add a new element
    equal(test1.toDos.length, 1) //new element has been added 
})


 //------------------------Testing deleteItem method-------------------------------------

 test("deleteItem() should remove an object from the toDos array", () => {
    const test1 = new ToDoList();
    equal(test1.toDos.length, 0) //check initial length
    test1.addItem("water the plants") //add element
    equal(test1.toDos.length, 1) //check the element has been added
    equal(test1.toDos[0].task, "water the plants")
    test1.deleteItem(0) //delete the element
    equal(test1.toDos.length, 0)
})

//------------------------Testing getAllItems method-------------------------------------
test("getAllItems() gets all the items from the toDos array", () => {
    const test = new ToDoList();
    test.addItem("to do 1")
    test.addItem("to do 2")
    test.addItem("to do 3")
    const allItems = test.getAllItems()
    equal(allItems.length, 3) //check if 3 elements have been added
})

//------------------------Testing getDoneItems() method-----------------------------------
test("getDoneItems() gets all done items from toDos array", () => {
    const test = new ToDoList();
    test.addItem("buy apples"); //add 2 elements
    test.addItem("peel the apple");
    test.toggleItemDone(0); //toggle first item done
    equal(test.toDos[0].done, true); //check if element is done/true
    equal(test.toDos[1].done, false); //check the other element is still false
    const allMarkedDoneItems = test.getDoneItems(); //get only the done element
    equal(allMarkedDoneItems.length, 1) //check if getDoneItems returns one element
    equal(allMarkedDoneItems[0].done, true) //check if the element returned is true 
})


//------------------------Testing toggleItemDone method-------------------------------------

test("toggleItemDone(index) should toggle the boolean value of the 'done' key for the selected element in the toDos array", () => {
    // Set up the test list:
    const testList = new ToDoList();
    testList.addItem("Paint the fridge");
    testList.addItem("Walk the onions");
    // Toggle done for item 0:
    testList.toggleItemDone(0);
    // Test that item 0 was toggled from false (default) to true:
    const actual0 = testList.toDos[0].done;
    const expected0 = true;
    equal(actual0, expected0);
    // Test that item 1 remained false:
    const actual1 = testList.toDos[1].done;
    const expected1 = false;
    equal(actual1, expected1);
    // Test that item 0 can be toggled back to false:
    testList.toggleItemDone(0);
    const actual2 = testList.toDos[0].done;
    const expected2 = false;
    equal(actual2, expected2);
});


//------------------------Testing updateDisplay function-------------------------------------

/*  All the tests below work by comparing an actual and expected string of HTML.
    A problem with this approach is that if we change what markup is produced,
    (i.e. by changing the updateDisplay function), we have to manually edit our test.
    Ideally, the test would be able to get an expected result another way?
*/

test("updateDisplay should add a list item to the document", () => {
    const testList = new ToDoList();
    testList.addItem("Test item 1");
    updateDisplay(testList);
    const actual0 = document.querySelector('.list-item-text').textContent;
    const expected0 = 'Test item 1';
    equal(actual0, expected0);
});

test("updateDisplay should change the document to show that a list item is marked as done", () => {
    const testList = new ToDoList();
    testList.addItem("Test item 2");
    testList.toggleItemDone(0);
    updateDisplay(testList);
    // Test for "done" class (and <s> tag?) instead.
    const actual0 = document.querySelector('section').innerHTML;
    const expected0 = '<ul><li class="list-items"><input type="checkbox" checked="on"><div class="list-item-text done"><s>Test item 2</s></div><input type="button" class="deleteBtn" value="—"></li></ul>';
    equal(actual0, expected0);
});

test("updateDisplay should change the document to show that a list item has been deleted", () => {
    const testList = new ToDoList();
    testList.addItem("Test item 3a");
    testList.addItem("Test item 3b");
    testList.deleteItem(0);
    updateDisplay(testList);
    const actual0 = document.querySelector('.list-item-text').textContent;
    const expected0 = 'Test item 3b';
    equal(actual0, expected0);
});

test("updateDisplay should add a checkbox to the document with an 'input' event listener that toggles marking an item as done", () => {
    const testList = new ToDoList();
    testList.addItem("Test item 4");
    updateDisplay(testList);
    // Get the checkbox input element (there's only one):
    const testEl = document.querySelector('section > ul > li > input[type=checkbox]');
    // Make a new 'input' event:
    const inputEvent = new InputEvent('input');
    // Trigger (dispatch) this 'input' event on the checkbox:
    testEl.dispatchEvent(inputEvent);
    // Test for "done" class (and <s> tag?) instead.
    const actual0 = document.querySelector('section').innerHTML;
    const expected0 = '<ul><li class="list-items"><input type="checkbox" checked="on"><div class="list-item-text done"><s>Test item 4</s></div><input type="button" class="deleteBtn" value="—"></li></ul>';
    equal(actual0, expected0);
});

test("updateDisplay should add a button to the document with a 'click' event listener that deletes a list item", () => {
    const testList = new ToDoList();
    testList.addItem("Test item 5a");
    testList.addItem("Test item 5b");
    updateDisplay(testList);
    // There will be two delete buttons, so just get the first:
    const testEl = document.querySelectorAll('input[type=button]')[0];
    const inputEvent = new InputEvent('click');
    testEl.dispatchEvent(inputEvent);
    const actual0 = document.querySelector('.list-item-text').textContent;
    const expected0 = 'Test item 5b';
    equal(actual0, expected0);
});


// Helper function for a couple of tests:
function addHiddenInputEl(form, listIdentifier) {
    const newEl = document.createElement('input');
    newEl.setAttribute('type', 'hidden');
    newEl.setAttribute('name', 'list');
    newEl.setAttribute('value', listIdentifier);
    form.prepend(newEl);
    return newEl;
}


test("updateDisplay should hide items marked done (not add them to document) if the filter is enabled", () => {
    window.testList = new ToDoList();

    const myForm = document.querySelector('form');
    const newHiddenInputEl = addHiddenInputEl(myForm, 'testList');

    testList.addItem("Test item one");
    testList.addItem("Test item two");
    testList.toggleItemDone(0);
    updateDisplay(testList);

    const testEl = document.querySelector('#filter');
    /*  It seems the checkbox has to be checked separately - dispatching the 'input' event
        on it won't do this. (And it needs to be checked before the event is dispatched!)
        (If it isn't checked, the if in updateDisplay appends the list item to the DOM.)
    */
    testEl.checked = true;
    const inputEvent = new InputEvent('input');
    testEl.dispatchEvent(inputEvent);

    const actual0 = document.querySelector('.list-item-text').textContent;
    const expected0 = 'Test item two';
    equal(actual0, expected0);

    // Could we form.reset instead?
    testEl.checked = false;
    newHiddenInputEl.remove();
});


//------------------------Testing handleFormInput function-------------------------------------

test("handleFormInput should add a new item to the list", () => {
    // For this test, the list instance needs to be global
    // (so it can be referred to programmatically)
    window.testList = new ToDoList();

    const myForm = document.querySelector('form');

    const newHiddenInputEl = addHiddenInputEl(myForm, 'testList');

    const testTextInputEl = myForm.querySelector('#task');
    testTextInputEl.value = 'Testing';

    const inputEvent = new InputEvent('submit');
    myForm.dispatchEvent(inputEvent);

    const actual0 = testList.toDos[0].task;
    const expected0 = 'Testing';
    equal(actual0, expected0);

    // Remove the hidden input element now we're done, so we don't add more than one!
    newHiddenInputEl.remove();
});