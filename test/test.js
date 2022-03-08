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


//------------------------Testing updateItem method-------------------------------------

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