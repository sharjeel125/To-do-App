var list = document.getElementById("list");

//console.log(firebase);

firebase.database().ref('toDoApps').on('child_added', function(data) {
    // create li tag with text node
    var li = document.createElement('li');
    li.classList.add("new-todo");
    li.classList.add("todo");
    var li_Text = document.createTextNode(data.val().value);
    li.appendChild(li_Text);

    //create delete button
    var delBtn = document.createElement('button');
    var del_Text = document.createTextNode("Delete");
    delBtn.setAttribute("class", "btn");
    delBtn.innerHTML = '<i class="fas fa-minus-circle"></i>'
    delBtn.setAttribute("onclick", "deleteItem(this)");
    delBtn.appendChild(del_Text);
    delBtn.classList.add("del-btn")


    //create edit button
    var editBtn = document.createElement('button');
    var edit_Text = document.createTextNode("Edit");
    editBtn.setAttribute("class", "btn");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>'
    editBtn.setAttribute("onclick", "editItem(this)");
    editBtn.appendChild(edit_Text);
    editBtn.classList.add("edit-btn")



    li.appendChild(delBtn);
    li.appendChild(editBtn)
    list.appendChild(li)

})

function addTodo() {
    var todo_list = document.getElementById("todo-item");
    var database = firebase.database().ref('toDoApps');
    var key = database.push().key;
    var todoApp = {
        value: todo_list.value,
        key: key
    }
    database.child(key).set(todoApp);

    todo_list.value = "";

    //console.log(li);
}

function deleteItem(dlt) {
    dlt.parentNode.remove();
}

function editItem(editpass) {
    var val = prompt("Enter Updated Value:", editpass.parentNode.firstChild.nodeValue);
    editpass.parentNode.firstChild.nodeValue = val;
}

function deleteAll() {
    list.innerHTML = "";
}