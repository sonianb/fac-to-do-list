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

//------------------------Testing getAllItems method-------------------------------------
test("markItemDone() changes the value of the done item to false", () => {
    const test = new ToDoList();
    test.addItem("I want to play"); //add one element
    equal(test.toDos[0].done, false) //check if it's false
    test.markItemDone(0); 
    equal(test.toDos[0].done, true)
})

//------------------------Testing getDoneItems() method-----------------------------------
test("getDoneItems() gets all done items from toDos array", () => {
    const test = new ToDoList();
    test.addItem("buy apples"); //add element
    test.markItemDone(0); //mark element done
    equal(test.toDos[0].done, true); //check if element has been marked done/true
    const allMarkedDoneElements = test.getDoneItems();
    // equal(allMarkedDoneElements)
})