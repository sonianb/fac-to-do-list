//------------------------Testing addItem method--------------------------------------

test("addItem() should add a new object to the toDos array", () => {
    const test1 = new ToDoList();
    equal(test1.toDos.length, 2) //check size before adding an item
    test1.addItem("I want to buy tomatoes"); //add a new element
    equal(test1.toDos.length, 3) //make sure array has the newly element 
    equal(test1.toDos[2].task, "I want to buy tomatoes")
    equal(test1.toDos[2].done, false);
})


 //------------------------Testing deleteItem method-------------------------------------

 test("deleteItem() should remove an object from the toDos array", () => {
    const test1 = new ToDoList();
    equal(test1.toDos.length, 2)
    test1.deleteItem("water the plants")
    equal(test1.toDos.length, 1)
})

test("with deleteItem() the original array will have the same elements except the removed ones", () => {
    const test2 = new ToDoList();
    test2.addItem("Go for a walk"); //add a new element 
    equal(test2.toDos.length, 3) //check if new element has been added
    equal(test2.toDos[2].task, "Go for a walk") //check if the correct element has been added
    test2.deleteItem(2) //delete the new element
    equal(test2.toDos[0].task, "walk the dog") //check if new array has same elements 
    equal(test2.toDos[1].task, "water the plants")
    equal(test2.toDos[2], undefined)
})