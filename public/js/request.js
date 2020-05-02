
var taskInput=document.getElementById("new-task");//Add a new task.
var taskInput2=document.getElementById("quant");//Add a new task.
var taskInput3=document.getElementById("units");//Add a new task.
var addButton=document.getElementById("add_item");//first button
var saveButton=document.getElementById("save_list");//first button
var empty_msg=document.getElementById("empty_list_msg");
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks



//New task list item
var createNewTaskElement=function(taskString,quantity,unit){

	var listItem=document.createElement("tr");
	var cell_2=document.createElement("td");
	var cell_3=document.createElement("td");
	var cell_4=document.createElement("td");
	var cell_5=document.createElement("td");

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
	deleteButton.innerText="Delete";
	deleteButton.className="delete btn btn-danger";

	//and appending.
	cell_2.appendChild(label);
	cell_3.appendChild(label2);
	cell_4.appendChild(label3);
	cell_5.appendChild(deleteButton);

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

  if(incompleteTaskHolder.rows.length>1)
    {
      empty_msg.style.display="none";
    }

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

    if(incompleteTaskHolder.rows.length==1)
      {
        empty_msg.style.display="block";
      }
}

var format=function(){

  var data = [];

  for (var i=1, row; row = incompleteTaskHolder.rows[i];i++){
    var item={
      name: row.cells[0].innerText,
      quantity: parseInt(row.cells[1].innerText),
      unit: row.cells[2].innerText
    }
    console.log(item);
    data.push(item);
  }

  ajaxRequest(data);
}

var ajaxRequest=function(data){

	var type;
	if (document.getElementById('customRadioInline1').checked) {
  	type = document.getElementById('customRadioInline1').value;
	}
	else if (document.getElementById('customRadioInline2').checked) {
  	type = document.getElementById('customRadioInline2').value;
	}
	else if (document.getElementById('customRadioInline3').checked) {
  	type = document.getElementById('customRadioInline3').value;
	}
	else {
		window.alert("Please select the type of request");
		return
	}

  $.ajax({
  url: document.URL,
  type: 'POST',
  data: {
    data :JSON.stringify(data),
		type : type
  },
  success: function(){
		window.location.href = document.URL
	},
  error: function(err){
    console.log(err.message);
  }
  });
}

//The glue to hold it all together.
var taskCompleted=function(){

	var cell=this.parentNode;
	var row =cell.parentNode;

	completedTasksHolder.appendChild(row);

	bindTaskEvents(row, taskIncomplete);
}


//Set the click handler to the addTask function.
addButton.addEventListener("click",addTask);
saveButton.addEventListener("click",format);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){

	var deleteButton=taskListItem.querySelector("button.delete");

			deleteButton.onclick=deleteTask;

}



	for (var i=1, row; row = incompleteTaskHolder.rows[i];i++){
		bindTaskEvents(row,taskCompleted);
	}
