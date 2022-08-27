// side_tasks-form

////////////////////////////////////
// Create Card after save
let allcards = document.getElementById("cards");
let row = document.createElement("div");
row.className = "row";
allcards.append(row);

//create card 
function createCard(task , id) {
 
  let col = document.createElement("div");
  col.className = "col-sm-4";
  col.setAttribute("id", id);
  row.append(col);
  
  //I have added id to the card to use it with delete it
  let card = document.createElement("div");
  card.className = "card text-center m-3";

  col.append(card);

  let cardHeader = document.createElement("div");
  cardHeader.className = "card-header d-flex justify-content-between";
  card.append(cardHeader);

  let spanTaskTitle = document.createElement("span");
  spanTaskTitle.textContent = task.title;
  cardHeader.append(spanTaskTitle);

  let aswomContaner = document.createElement("span");
  aswomContaner.className = "d-inline-flex gap-2";
  cardHeader.append(aswomContaner);

  let icon = document.createElement("i");
  icon.className = "fa-solid fa-pen-to-square";
  //  data-bs-toggle="modal" data-bs-target="#staticBackdrop
  // icon.setAttribute("data-bs-toggle","modal")
  // icon.setAttribute("data-bs-target","#staticBackdropG")
  aswomContaner.append(icon);

  //I have added id to the iconXmark to use it with delete it
  let iconXmark = document.createElement("i");
  iconXmark.setAttribute("id", "delCardIcon");
  iconXmark.className = "fa-solid fa-circle-xmark";
  iconXmark.setAttribute("onclick", "deleteSingleCard("+id+")");

  aswomContaner.append(iconXmark);

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  card.append(cardBody);

  let cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = task.details;
  cardBody.append(cardText);

  let checkboxContaner = document.createElement("div");
  checkboxContaner.className = "input-group mb-0";
  cardBody.append(checkboxContaner);

  let completeTask = document.createElement("span");
  completeTask.className = "input-group-text";
  completeTask.id = "inputGroup-sizing-default";
  completeTask.textContent = "Complete";
  checkboxContaner.append(completeTask);

  let checkboxDiv = document.createElement("div");
  checkboxDiv.className = "input-group-text";
  checkboxDiv.setAttribute(
    "style",
    "border-top-right-radius: 5px; border-bottom-right-radius: 5px;"
  );
  checkboxContaner.append(checkboxDiv);

  let inputCheckbox = document.createElement("input");
  inputCheckbox.className = "form-check-input mt-0";
  inputCheckbox.id=`compete-${id}`;
  inputCheckbox.type = "checkbox";
  inputCheckbox.value = '"';
  inputCheckbox.setAttribute("class" , "checkbox")
  inputCheckbox.setAttribute("onclick", "completedTasks("+id+")");
  inputCheckbox.ariaLabel = "Checkbox for following text input";
  checkboxDiv.append(inputCheckbox);

  let divPriority = document.createElement("div");
  checkboxContaner.append(divPriority);

  let spanPriority = document.createElement("span");
  spanPriority.className = "input-group-text position-absolute end-0";
  spanPriority.id = "inputGroup-sizing-default";
  spanPriority.textContent = task.priority;
  divPriority.append(spanPriority);

  let cardFooter = document.createElement("div");
  cardFooter.className = "card-footer  d-flex justify-content-center";
  card.append(cardFooter);

  let remainTime = document.createElement("span");
  remainTime.className = "text-muted";
  ///////////// this function calculate the time by month *Turkyeh
  let month = 0;
  let day = 0;
  function timedeteles(params) {
    if (params >=30)
    {
      day = params % 30;
      month = Math.floor(params / 30);
      }
    else {
      day = params % 30;
      month = 0;

    }
    return `Month: ${month} \t Day: ${day} \t`;
  };

// //////////////////////////////////////////////////////////////////////////



  remainTime.textContent = timedeteles(task.remainTime); 

  
  cardFooter.append(remainTime);

  let saveSpan = document.createElement("span");
  cardFooter.append(saveSpan);


  let saveIcon = document.createElement("i");
  saveIcon.className = "fa-solid fa-circle-check";
  saveSpan.append(saveIcon);
  id++;


}

// save change 
let saveChange = document.getElementById("saveChange");

saveChange.onclick = event => {


}

// logout function

let logout = document.getElementById("logoutModal");
logout.onclick = (event) => {
  for (let i = 0; i < user.length; i++) {
    const element = user[i];

    element.isLogged = false;

  }
  console.log(user);
  localStorage.setItem("user", JSON.stringify(user));
  let saveTask = getSaveDate();
  location.href = "index.html";
};

function getSaveDate() {
  return JSON.parse(localStorage.getItem("user"));
}

// Save new task button
let user = [];
if (getSaveDate()) {
  user = getSaveDate();
}
function setDataInLocal(userArray) {
  localStorage.setItem("user", JSON.stringify(userArray));
}

// test case --------
// let newUser = new User("Anas", "mohammed", "tt@ttt.com", "12234");
// user.push(newUser);

// ---------
let TaskId = 0;
let saveButton = document.getElementById("saveNewTask");
saveButton.onclick = (event) => {
  let inputTitle = document.getElementById("inputTitle").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let inputDescription = document.getElementById("inputDescription").value;

  let criticalR = document.getElementById("criticalR");
  let normalR = document.getElementById("normalR");
  let lowR = document.getElementById("lowR");

  let priority = "";
  if (criticalR.checked) {
    priority = "Critical";
  } else if (normalR.checked) {
    priority = "Normal";
  } else {
    priority = "Low priority";
  }
  if (inputTitle == "" || inputTitle === null) {
    return
  }
  console.log(compareDate(startDate, endDate));
  if (!compareDate(startDate, endDate)) {


    return
  }


  // Find user who login & add task to user object
  for (let i = 0; i < user.length; i++) {
    const element = user[i];
    if (element.isLogged) {

      let task = new Task(inputTitle, endDate, startDate, inputDescription, priority, TaskId);
      
      console.log(task);
      element.tasks.push(task);
      
      createCard(task ,TaskId);
      TaskId++;
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

};

function compareDate(startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  if ((end.getTime() - start.getTime()) < 0) {
    return false
  }
  return true;
}

let welcomeModelTask = document.getElementById("welcomeModelTask");

window.onload = (event) => {
  welcomeModelTask.click();
};
//delete single card
function deleteSingleCard(id){
    for(let i =0 ; i<user.length; i++){
        let element = user[i]
        if(element.isLogged){
          for(let j=0 ; j<element.tasks.length;j++){
            if(element.tasks[j].idDOM==id){
                if(element.tasks.length==1){
                    deleteCard(element.tasks[j].idDOM)
                    element.tasks.splice(0, 1);
                }
                else{
                    deleteCard(element.tasks[j].idDOM)
                    element.tasks.splice(j, 1);
                }
            }
        }
        localStorage.setItem('user', JSON.stringify(user));}
    }
}
// Delete card
let delCardIcon = document.getElementById("delCardIcon");
// delCardIcon.addEventListener("click",deleteCard(id));

function deleteCard(id) {
  let delCard = document.getElementById(id);
  delCard.remove();    

}

// Disable back button
window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
  window.history.go(1);
};




// filter by priority

let priorityCritical = document.getElementById("priorityCritical");
let priorityNormal = document.getElementById("priorityNormal");
let priorityLow = document.getElementById("priorityLow");



priorityCritical.onclick = event => {
  event.preventDefault()

  let taskArray = []

  for (let index = 0; index < user.length; index++) {
    const element = user[index];
    if (element.isLogged) {
      taskArray.push(element.tasks)
    }

  }

 for (let index = 0; index < taskArray.length; index++) {
  const element = taskArray[index];
  for (let index = 0; index < element.length; index++) {
    const task = element[index];
    if (task.priority!="Critical") {
      let id = (task.idDOM).toString()
      let card = document.getElementById(id)
      card.style.display="none"
    }
    
  }
  
 }

}


// view saved tasks cards 
let refId=0;
    for(let i =0 ; i<user.length; i++)
    if(user[i].isLogged){
        user[i].tasks.forEach((e)=>{createCard(e,user[i].tasks[refId].idDOM);refId++;}) 
    }


/* 
let task = new Task(inputTitle, endDate, inputDescription, priority);
      console.log(task);
      element.tasks.push(task);
       */


priorityNormal.onclick = event => {
  event.preventDefault()

  let taskArray = []

  for (let index = 0; index < user.length; index++) {
    const element = user[index];
    if (element.isLogged) {
      // console.log(element);
      taskArray.push(element.tasks)
    }

  }

 for (let index = 0; index < taskArray.length; index++) {
  const element = taskArray[index];
  for (let index = 0; index < element.length; index++) {
    const task = element[index];
    if (task.priority!="Normal") {
      let id = (task.idDOM).toString()
      let card = document.getElementById(id)
      
      card.style.display="none"
    }
    
  }
  
 }

}

priorityLow.onclick = event => {
  event.preventDefault()

  let taskArray = []

  for (let index = 0; index < user.length; index++) {
    const element = user[index];
    if (element.isLogged) {
      // console.log(element);
      taskArray.push(element.tasks)
    }

  }

 for (let index = 0; index < taskArray.length; index++) {
  const element = taskArray[index];
  for (let index = 0; index < element.length; index++) {
    const task = element[index];
    if (task.priority!="Low priority") {
      let id = (task.idDOM).toString()
      let card = document.getElementById(id)
      
      card.style.display="none"
    }
    
  }
  
 }

}



   



function completedTasks(id){
    
    for(let i =0 ; i<user.length; i++){
        let element = user[i]
        if(element.isLogged){
       
            for(let i=0 ; i<element.tasks.length;i++){
                if(  element.tasks[i].idDOM==id){
                    console.log(element.tasks[i].idDOM)
                    if(element.tasks[i].completed==false)
                    element.tasks[i].completed=true
                    else
                    element.tasks[i].completed=false
                }
                else{

                }
                localStorage.setItem('user', JSON.stringify(user));
            }
            
         
            
            
        }
    }
   
}




// filter bu complete state
let completeState = document.getElementById("completeState");

completeState.onclick = event => {
  event.preventDefault()

  let taskArray = []

  for (let index = 0; index < user.length; index++) {
    const element = user[index];
    if (element.isLogged) {
      // console.log(element);
      taskArray.push(element.tasks)
    }

  }

 for (let index = 0; index < taskArray.length; index++) {
  const element = taskArray[index];
  for (let index = 0; index < element.length; index++) {
    const task = element[index];
    if (task.completed== false) {
      let id = (task.idDOM).toString()
      let card = document.getElementById(id)
      
      card.style.display="none"
    }
    
  }
  
 }

}

let incompleteState = document.getElementById("incompleteState");

incompleteState.onclick = event => {
  event.preventDefault()

  let taskArray = []

  for (let index = 0; index < user.length; index++) {
    const element = user[index];
    if (element.isLogged) {
      // console.log(element);
      taskArray.push(element.tasks)
    }

  }

 for (let index = 0; index < taskArray.length; index++) {
  const element = taskArray[index];
  for (let index = 0; index < element.length; index++) {
    const task = element[index];
    if (task.completed== true) {
      let id = (task.idDOM).toString()
      let card = document.getElementById(id)
      
      card.style.display="none"
    }
    
  }
  
 }

}

// without filter

let without = document.getElementById("redo")

without.onclick = event => {
  event.preventDefault()
  let taskArray = []

  for (let index = 0; index < user.length; index++) {
    const element = user[index];
    if (element.isLogged) {
      // console.log(element);
      taskArray.push(element.tasks)
    }

  }

 for (let index = 0; index < taskArray.length; index++) {
  const element = taskArray[index];
  for (let index = 0; index < element.length; index++) {
    const task = element[index];
  
      let id = (task.idDOM).toString()
      let card = document.getElementById(id)
     
      card.style.display="block"
    
    
  }
  
 }

}




// clear all completed tasks
// let clearAll = document.querySelectorAll('.clear');
// clearAll[0].addEventListener('click' , clearCompletedT())
// clearAll[1].addEventListener('click' , clearCompletedT())


function clearCompletedT(){
let completeTask=[]
    for(let i =0 ; i<user.length; i++){
        let element = user[i]
        if(element.isLogged){
          for(let j=0 ; j<element.tasks.length;j++){
            
            if(element.tasks[j].completed==true){
                completeTask.push(element.tasks[j])
            }

         
        }
        completeTask.forEach(e=>{
          
          for(let i=0;i<element.tasks.length;i++){
            if(  element.tasks[i].idDOM==e.idDOM){
              deleteCard(e.idDOM)
            if(element.tasks.length==1){
              element.tasks.splice(0, 1);
          }
          
          else{
              element.tasks.splice(i, 1);
          }
        }
          }
         
        })

        localStorage.setItem('user', JSON.stringify(user));
       
        
        }
    }
     
}


