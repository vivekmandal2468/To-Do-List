// mera likha hua code  

const addBtn = document.getElementById  ('addBtn');
const inputBox = document.getElementById  ('inputBox');
const todolist = document.getElementById  ('todolist');

let editTodo ;

//  2nd line of code - To add Todo
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if(inputText.length <= 0 ){
        alert("Chutia Hai Kya ?");
        return false ;               // isse jb button click hoga & andar kuch bhara nhi hoga tb koi empty array create nhi hoga
    }

    if (addBtn.value === "Edit") {
        editTodo.target.previousElementSibling.innerHTML = inputText ;
        addBtn.value = "Add Task" ;
        inputBox.value = "" ; 
    }

    else {
// creating p tag
   const li =  document.createElement("li");
   const p =  document.createElement("p");
   
   p.innerHTML = inputText ;
   li.appendChild(p);          // isse p , li me ghus jayega
   
   todolist.appendChild(li); 
   inputBox.value = "";        // new task add hone ke baad dabba khali ho jayega
    
   
   // Creating Edit button
   const editBtn  =  document.createElement ("button");
   editBtn.innerHTML = "Edit" ;
   li.appendChild(editBtn);
   editBtn.classList.add("btn" , "editBtn") ;          // to add a classs use .classList.add("class name") , we can also add multiple classes 
   
   // Creating delete button
   const deleteBtn  =  document.createElement ("button");
   deleteBtn.innerHTML = "Remove" ;
   deleteBtn.classList.add("btn" , "deleteBtn" ) ;       
   li.appendChild(deleteBtn);

   todolist.appendChild(li);
   inputBox.value = "" ;
   saveLocal(inputText)      // save the data to saveLocal fn. below
}        
}  
                             

//-----------------------------------------------------------------------------------------------------------------------------------------------



// 3rd line of code - To update todo - Edit/Delete
const updateTodo = (e) => {   
    if (e.target.innerHTML=== "Remove"){             // working of remove button
        todolist.removeChild(e.target.parentElement);
        deleteLocalTodo(e.target.parentElement);      // neeche hai ye fn.
    }
    
    if (e.target.innerHTML==="Edit") {               // working of edit button
        inputBox.value = (e.target.previousElementSibling.innerHTML);
        inputBox.focus();
        addBtn.value = "Edit" ;
        editTodo = e ;
        
    }
};

//  1st line 
addBtn.addEventListener('click', addTodo) ;                // 1st line of code & upar wala , addTodo ka part hai
todolist.addEventListener('click', updateTodo);
document.addEventListener('DOMContentLoaded' , getLocalTodos) ; // jb content load ho jae tb get localtodo fn. cha do

//------------------------------------------------------------------------------------------------------------------

// to save the data in local storage
const saveLocal  = (todo) => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
            todos = [];
    }
    else{
    todos = JSON.parse(localStorage.getItem("todos"));       //JSON.parse string ko object me convert krta hai
    }
    todos.push(todo);
    localStorage.setItem("todos" , JSON.stringify(todos));   // JSON.stringify se string me covert ho jayega
} 


// to get the saved data from local storage

const getLocalTodos = () => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
            todos = [];
    }
    else{
    todos = JSON.parse(localStorage.getItem("todos"));       //JSON.parse string ko object me convert krta hai
    todos.forEach(todo => {
      // upar ka copy paste hai  
        // creating p tag
   const li =  document.createElement("li");
   const p =  document.createElement("p");
   
   p.innerHTML = todo ;                                     // isne inputText ki jagah todo dala  hai
   li.appendChild(p);          // isse p , li me ghus jayega
   
   todolist.appendChild(li); 
   inputBox.value = "";        // new task add hone ke baad dabba khali ho jayega
    
   
   // Creating Edit button
   const editBtn  =  document.createElement ("button");
   editBtn.innerHTML = "Edit" ;
   li.appendChild(editBtn);
   editBtn.classList.add("btn" , "editBtn") ;          // to add a classs use .classList.add("class name") , we can also add multiple classes 
   
   // Creating delete button
   const deleteBtn  =  document.createElement ("button");
   deleteBtn.innerHTML = "Remove" ;
   deleteBtn.classList.add("btn" , "deleteBtn" ) ;       
   li.appendChild(deleteBtn);

   todolist.appendChild(li);

    });
    }

}




//delete krne pr local storage me bhi delete ho jae
const deleteLocalTodo = () => {

  //  copy paste kea hai save fn. se
    let todos = [];
    if (localStorage.getItem("todos") === null) {
            todos = [];
    }
    else{
    todos = JSON.parse(localStorage.getItem("todos"));       //JSON.parse string ko object me convert krta hai
    }

    let todoText = todoText.children[0].innerHTML ;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex , 1);                       //splice original array ko he seedha manupulate
    localStorage.setItem("todos" , JSON.stringify(todos));
}

