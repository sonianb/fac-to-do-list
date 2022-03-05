//------------------------Testing addItem method--------------------------------------

test("addItem() should add a new object to the toDolist array", () => {
    const test1 = new ToDoList();
    equal(test1.toDos.length, 2) //check size before adding an item
    test1.addItem("I want to buy tomatoes"); //add a new element
    equal(test1.toDos.length, 3) //make sure array has the newly element 
    equal(test1.toDos[2].task, "I want to buy tomatoes")
    equal(test1.toDos[2].done, false);
})


 