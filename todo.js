// Ara Yuzu tanima ve Todo ekleme

//Tum elementleri secme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() { //Tum Event listener'lar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(){
    if(confirm("Tumunu silmek istediyinize eminmisiniz?")){

        //Arayuzden todo'lari temizleme,kaldirmak
        // todoList.innerHTML="";// Yavas
        
        while(todoList.firstElementChild !=null){
            todoList.removeChild(todoList.firstElementChild);
            
        }
        // todoList.removeChild(todoList.firstElementChild);
        // todoList.removeChild(todoList.firstElementChild);
        // todoList.removeChild(todoList.firstElementChild);
        // todoList.removeChild(todoList.firstElementChild);
        // console.log(todoList.firstElementChild);

        localStorage.removeItem("todos");//Storage'den todo'lari silme
    }

}
function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)=== -1){
            //Bulamadi

            listItem.setAttribute("style","display:none !important");
        }
        else{
            listItem.setAttribute("style","display:block");
        }

    });



}
function deleteTodo(e){//Todo'lari Ara Yuzden Temizleme
    // console.log(e.target);

    if(e.target.className === "fa fa-remove"){
        // console.log("Silme Islemi");
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo Basriyla Silindi...")
    }

}
function deleteTodoFromStorage(deletetodo){//Todo'lari local stroage'den silme
    let todos=getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);//Arrayden degeri silme
        }
    })

    localStorage.setItem("todos",JSON.stringify(todos));

}
function loadAllTodosToUI(e){//Sayfayi yenilerken Todo'larin kalmasi icin
    let todos=getTodosFromStorage();
    
    todos.forEach(function(todo){
        addTodoToUI(todo);


    })

}
function addTodo(e) {
    const newTodo = todoInput.value.trim();//input'daki yazdigim degeri alma
    


    if (newTodo === "") {
        /*<div class="alert alert-danger" role="alert">
                    A simple danger alert—check it out!
                </div>
         */
        showAlert("danger","Lutfen bir todo girin...");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo basariyla eklendi");

    }


    e.preventDefault();
}
function getTodosFromStorage(){//Storage'den butun todo'lari almak
    let todos;

    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}
function addTodoToStorage(newTodo){

    let todos=getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));

    
}
function showAlert(type,message){//Alertin gelmesi
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;

    alert.textContent=message;

    firstCardBody.appendChild(alert);

    // setTimeout metodu
    setTimeout(function(){
        alert.remove();
    },1000);//1 saniye sonra silecek

    // console.log(alert);
}
function addTodoToUI(newTodo) {// String degerinin list-item olarak UI'ya(arayuz,user interface) ekleyecek;

    /*<li class="list-group-item d-flex justify-content-between">
         Todo 1
        <a href="#" class="delete-item">
            <i class="fa fa-remove"></i>
        </a>
    </li>*/

    //List item olustuma
    const listItem = document.createElement("li");
    //Link olusturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    // Text Node ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    //Link'i list item'a ekleme
    listItem.appendChild(link);

    // Todo List'e list item'i ekleme(ul tag'ine ekleme)
    todoList.appendChild(listItem);

    todoInput.value = "";


}