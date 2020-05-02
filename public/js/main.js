
var taskInput=document.getElementById("new-task");//Add a new task.
var taskInput2=document.getElementById("quant");//Add a new task.
var taskInput3=document.getElementById("units");//Add a new task.
var addButton=document.getElementById("add_item");//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString,quantity,unit){

	var listItem=document.createElement("tr");
	var cell_1=document.createElement("td");
	var cell_2=document.createElement("td");
	var cell_3=document.createElement("td");
	var cell_4=document.createElement("td");
	var cell_5=document.createElement("td");

	//input (checkbox)
	var checkBox=document.createElement("input");//checkbx

	//label
	var label=document.createElement("label");//label
	var label2=document.createElement("label");//label
	var label3=document.createElement("label");//label

	//button.delete
	var deleteButton=document.createElement("button");//delete button

	label.innerText=taskString;
	label2.innerText=quantity;
	label3.innerText=unit;

	//Each elements, needs appending
	checkBox.type="checkbox";
	checkBox.className="form-check-input";
	deleteButton.innerText="Delete";
	deleteButton.className="delete btn btn-danger";

	//and appending.
	cell_1.appendChild(checkBox);
	cell_2.appendChild(label);
	cell_3.appendChild(label2);
	cell_4.appendChild(label3);
	cell_5.appendChild(deleteButton);
	listItem.appendChild(cell_1);
	listItem.appendChild(cell_2);
	listItem.appendChild(cell_3);
	listItem.appendChild(cell_4);
	listItem.appendChild(cell_5);
	return listItem;
}



var addTask=function(){
	console.log("Add Task...");
	//Create a new list item with the text from the #new-task:

	var listItem=createNewTaskElement(taskInput.value,taskInput2.value,taskInput3.value);

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";
	taskInput2.value="";
	taskInput3.value="Units";
}



//Delete task.
var deleteTask=function(){

		var cell=this.parentNode;
		var row=cell.parentNode;
		var table=row.parentNode;

		table.removeChild(row);
}


//Mark task completed
var taskCompleted=function(){

	var cell=this.parentNode;
	var row =cell.parentNode;

	completedTasksHolder.appendChild(row);

	bindTaskEvents(row, taskIncomplete);
}


var taskIncomplete=function(){

	var cell=this.parentNode;
	var row =cell.parentNode;

	incompleteTaskHolder.appendChild(row);

	bindTaskEvents(row,taskCompleted);
}



var ajaxRequest=function(){
	console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){

	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var deleteButton=taskListItem.querySelector("button.delete");

			//Bind deleteTask to delete button.
			deleteButton.onclick=deleteTask;
			//Bind taskCompleted to checkBoxEventHandler.
			checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
	//for each list item


	for (var i=1, row; row = incompleteTaskHolder.rows[i];i++){
		bindTaskEvents(row,taskCompleted);
	}


//cycle over completedTasksHolder ul list items
	for (var i=1,row ; row = completedTasksHolder.rows[i];i++){
	//bind events to list items chldren(tasksIncompleted)
		bindTaskEvents(row,taskIncomplete);
	}
