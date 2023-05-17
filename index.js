const readline = require("readline");

// Create the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create an array to store tasks
const tasks = [];

// Display the menu
function displayMenu() {
  console.log("***************************");
  console.log("Welcome to JS TODO-APP");
  console.log("***************************");
  console.log("Select an action:");
  console.log("1) Add a new task");
  console.log("2) List all tasks");
  console.log("3) List completed tasks");
  console.log("4) Mark a task as done");
  console.log("5) Delete a task");
  console.log("6) Sort tasks by due date");
  console.log("7) Sort tasks by priority");
  console.log("8) Clear all tasks");
  console.log("***************************");
  console.log("What's your choice?");
}

// Prompt the user for their choice
function promptChoice() {
  rl.question("", function (choice) {
    processChoice(parseInt(choice));
    //return choice;
  });
}

// Process the user's choice
function processChoice(choice) {
  switch (choice) {
    case 1:
      addTask();
      break;
    case 2:
      listAllTasks();
      break;
    case 3:
      listCompletedTasks();
      break;
    case 4:
      markTaskAsDone();
      break;
    case 5:
      deleteTask();
      break;
    case 6:
      sortTasksByDueDate();
      break;
    case 7:
      sortTasksByPriority();
      break;
    case 8:
      clearAllTasks();
      break;
    default:
      console.log("Invalid choice. Please try again.");
  }

  // Prompt for the next choice
  promptChoice();
}

// Add a new task
function addTask() {
  console.log("Enter the task description:");
  rl.question("", function (description) {
    console.log("Enter the due date:");
    rl.question("", function (dueDate) {
      console.log("Enter the priority:");
      rl.question("", function (priority) {
        const task = {
          description,
          due_date: dueDate,
          priority,
          completed: false,
        };
        tasks.push(task);
        console.log("Task added successfully.");
      });
    });
  });
}

// List all tasks
function listAllTasks() {
  console.log("All tasks:");
  tasks.forEach(function (task) {
    console.log(task.description);
  });
}

// List completed tasks
function listCompletedTasks() {
  console.log("Completed tasks:");
  const completedTasks = tasks.filter(function (task) {
    return task.completed;
  });
  completedTasks.forEach(function (task) {
    console.log(task.description);
  });
}

// Mark a task as done
function markTaskAsDone() {
  console.log("Enter the index of the task to mark as done:");
  rl.question("", function (index) {
    index = parseInt(index);
    if (index >= 0 && index < tasks.length) {
      tasks[index].completed = true;
      console.log("Task marked as done.");
    } else {
      console.log("Invalid index. Please try again.");
    }
  });
}

// Delete a task
function deleteTask() {
  console.log("Enter the index of the task to delete:");
  rl.question("", function (index) {
    index = parseInt(index);
    if (index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
      console.log("Task deleted.");
    } else {
      console.log("Invalid index. Please try again.");
    }
  });
}

// Sort tasks by due date
function sortTasksByDueDate() {
  tasks.sort(function (a, b) {
    return new Date(a.due_date) - new Date(b.due_date);
  });
  console.log("Tasks sorted by due date.");
}

// Sort tasks by priority
function sortTasksByPriority() {
  tasks.sort(function (a, b) {
    return a.priority - b.priority;
  });
  console.log("Tasks sorted by priority.");
}

// Clear all tasks
function clearAllTasks() {
  tasks.length = 0;
  console.log("All tasks cleared.");
}

// Start the app

displayMenu();
promptChoice();
