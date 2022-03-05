//------------------------Testing addItems()--------------------------------------

test("addItem() should add a new object to the toDolist array", () => {
    const result = addItem("I want to buy tomatoes");
    equal(result.name, "I want to buy tomatoes")
    equal(result.done, false)
    equal(toDoList.length, 3)
})

// test("addItems() should read user's input value", () => {

// })

test("addItems() should modify the length of the toDolist array", () => {

})
 