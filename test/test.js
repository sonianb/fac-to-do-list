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

test("updateDisplay should add a list item to the document", () => {
    // Set up test list (we shouldn't use localStorage):
    const testList = new ToDoList();
    testList.addItem("Test item 1");
    updateDisplay(testList);
    // One approach is to compare the HTML, as a string:
    const actual0 = document.querySelector('section').innerHTML;
    const expected0 = '<div><input type="checkbox"><span>Test item 1</span><input type="button" value="X"></div>';
    equal(actual0, expected0);
    /*  A problem with this approach is that if we change what markup is produced,
        (i.e. by changing the updateDisplay function), we have to manually edit our test.
        Ideally, the test would be able to get an expected result another way?
    */
});

test("updateDisplay should change the document to show that a list item is marked as done", () => {
    const testList = new ToDoList();
    testList.addItem("Test item 2");
    testList.toggleItemDone(0);
    updateDisplay(testList);
    const actual0 = document.querySelector('section').innerHTML;
    const expected0 = '<div><input type="checkbox" checked="on"><span class="done"><s>Test item 2</s></span><input type="button" value="X"></div>';
    equal(actual0, expected0);
    /*  A problem with this approach is that if we change what markup is produced,
        (i.e. by changing the updateDisplay function), we have to manually edit our test.
        Ideally, the test would be able to get an expected result another way?
    */
});

test("updateDisplay should change the document to show that a list item has been deleted", () => {
    const testList = new ToDoList();
    testList.addItem("Test item 3a");
    testList.addItem("Test item 3b");
    testList.deleteItem(0);
    updateDisplay(testList);
    const actual0 = document.querySelector('section').innerHTML;
    const expected0 = '<div><input type="checkbox"><span>Test item 3b</span><input type="button" value="X"></div>';
    equal(actual0, expected0);
});