const addBtn = document.getElementById('addBtn');
const inputBox = document.getElementById('inputBox');
const todolist = document.getElementById('todolist');

let editTodo;

// Function to add or edit a todo
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("abe lodu");
        return false;             // isse jb button click hoga & andar kuch bhara nhi hoga tb koi empty array create nhi hoga
    }

    if (addBtn.value === "Edit") {
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    } else {
        // Create list item
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);         // isse p , li me ghus jayega

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");        // to add a classs use .classList.add("class name") , we can also add multiple classes 
        li.appendChild(deleteBtn);

        todolist.appendChild(li);
        inputBox.value = "";                 // new task add hone ke baad dabba khali ho jayega
        saveLocal(inputText);               // // save the data to saveLocal fn. below      
    }
};

// Function to handle edit or delete of todo
const updateTodo = (e) => {
    if (e.target.innerHTML === "Remove") {             // working of remove button
        todolist.removeChild(e.target.parentElement);
        deleteLocalTodo(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {              // working of editt button
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
};

// Save to localStorage

// let todos = [];
//     if (localStorage.getItem("todos") === null) {
//             todos = [];
//     }
//     else{
//     todos = JSON.parse(localStorage.getItem("todos"));       //JSON.parse string ko object me convert krta hai
//     }
//     todos.push(todo);
//     localStorage.setItem("todos" , JSON.stringify(todos));   // JSON.stringify se string me covert ho jayega

//                                 or
const saveLocal = (todo) => {
    let todos = localStorage.getItem("todos") === null ? [] : JSON.parse(localStorage.getItem("todos"));
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Get saved data from localStorage
const getLocalTodos = () => {
    let todos = localStorage.getItem("todos") === null ? [] : JSON.parse(localStorage.getItem("todos"));
    todos.forEach(todo => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = todo;
        li.appendChild(p);

        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todolist.appendChild(li);
    });
};

// Delete from localStorage     after it delete from the the interface
const deleteLocalTodo = (todo) => {
    let todos = localStorage.getItem("todos") === null ? [] : JSON.parse(localStorage.getItem("todos"));
    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
        todos.splice(todoIndex, 1);                            //splice original array ko he seedha manupulate krta hai
        localStorage.setItem("todos", JSON.stringify(todos));
};

// Edit in localStorage
const editLocalTodos = (oldTodo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(oldTodo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Event listeners
addBtn.addEventListener('click', addTodo);
todolist.addEventListener('click', updateTodo);
document.addEventListener('DOMContentLoaded', getLocalTodos);


//---------------------------------------------------------------------------------------------------------------------------

// some esay ways to wright the same code 

// code 1   from  Delete from local storage

// |let todos = localStorage.getItem("todos") === null ? [] : JSON.parse(localStorage.getItem("todos"));
//           OR
//
// |let todos = [];
// |   if (localStorage.getItem("todos") === null) {
// |          todos = [];
// | }
// |else{
// |todos = JSON.parse(localStorage.getItem("todos"));       //JSON.parse string ko object me convert krta hai
// |  } 
