
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks
var updateButton=document.getElementById("update_item");

updateButton.addEventListener("click",ajaxRequest);

var ajaxRequest=function(){

	var pending = [];
	var complete = [];

	for (var i=1, row; row = incompleteTaskHolder.rows[i];i++){

		var item={
			name: row.cells[0].innerText,
			quantity: parseInt(row.cells[1].innerText),
			unit: row.cells[2].innerText
		}

		pending.push(item);
	}


	for (var i=1, row; row = completedTaskHolder.rows[i];i++){

		var item={
			name: row.cells[0].innerText,
			quantity: parseInt(row.cells[1].innerText),
			unit: row.cells[2].innerText
		}

		complete.push(item);
	}

	putRequest(pending,complete);
}

var putRequest=function(pending,complete){
			$.ajax({
			url: document.URL,
			type: 'PUT',
			data: {
				pending :JSON.stringify(pending),
				complete :JSON.stringify(complete),
			},
			success: function(){
				window.location.href = document.URL
			},
			error: function(err){
				console.log(err.message);
			}
			});
}


var addTask=function(){
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";
	taskInput2.value="";
	taskInput3.value="Units";
}

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

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){

	var checkBox=taskListItem.querySelector("input[type=checkbox]");

	checkBox.onchange=checkBoxEventHandler;
}

	for (var i=1, row; row = incompleteTaskHolder.rows[i];i++){
		console.log(row);
		bindTaskEvents(row,taskCompleted);
	}


	for (var i=1,row ; row = completedTasksHolder.rows[i];i++){
		bindTaskEvents(row,taskIncomplete);
	}
