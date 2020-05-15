

const input = document.getElementById('task-input');
const totalTasks = document.getElementById('total');
const completedTasks = document.getElementById('completed');
const modal = document.getElementById('modal');
const maxRecentlyDeleted = 4;

loadData("totalTasks") || saveData("totalTasks" , 0);
loadData("completedTasks") || saveData("completedTasks" , 0);
loadData("toDoTheme") || saveData("toDoTheme" , "light");

totalTasks.innerHTML = loadData("totalTasks");
completedTasks.innerHTML = loadData("completedTasks");

function updateTasks(){

    readTasks(taskStore , function(tasks){
        let list = document.getElementById("task-list");
        let innerHTML = "";

        for(let i = 0; i < tasks.length ; i++) {
            innerHTML += `
                <li data-id="${tasks[i].id}" onclick='deleteTaskOnClick(this)'>
                    ${tasks[i].title}
                </li>
            `;
        }

        list.innerHTML = innerHTML;
    });




    readTasks(completedTaskStore , function(tasks){
        let list = document.getElementById("completed-task-list");
        let innerHTML = "";
        tasks.reverse();

        for(let i = 0; i < Math.min(tasks.length , maxRecentlyDeleted) ; i++) {
            innerHTML += `
                <li class='invert'>
                    ${tasks[i].title} : <span>${task[i].completedDate}</span>
                </li>
            `;
        }

        list.innerHTML = innerHTML;
    });
}

function onLoad(){
    updateTasks();
}

input.addEventListener("keydown" , function(e){
    if(e.keyCode === 13) {
        let task = new Task(input.value);
        input.value = "";
        if(task.title.length === 0) { return }

        addTask(taskStore , task , function(){
            let amountOfTasks = Number(loadData("totalTasks")) + 1;
            saveData("totalTasks" , amountOfTasks);
            totalTasks.innerHTML = loadData("totalTasks");
            updateTasks();
        });
    }
});
