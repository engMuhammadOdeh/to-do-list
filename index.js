// Define the TodoList object to manage the list of tasks
function TodoList() {
  this.tasks = [];

  // Add a new task to the list
  this.addTask = function (task) {
    this.tasks.push(task);
  };

  // Mark a task as completed
  this.markTaskAsCompleted = function (taskDescription) {
    this.tasks.filter(function (task) {
      if (task.description === taskDescription) {
        task.completed = true;
      }
    });
  };

  // Delete a task from the list
  this.deleteTask = function (taskDescription) {
    var index = -1;
    for (var i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].description === taskDescription) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  };

  // Get a list of all tasks or only completed/incompleted tasks
  this.getTasks = function (completed) {
    if (completed === undefined) {
      return this.tasks;
    } else {
      return this.tasks.filter(function (task) {
        return task.completed === completed;
      });
    }
  };

  // Sort tasks by the due date or priority level
  this.sortTasks = function (criteria) {
    if (criteria === "dueDate") {
      this.tasks.sort(function (a, b) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (criteria === "priority") {
      this.tasks.sort(function (a, b) {
        return a.priority - b.priority;
      });
    }
  };

  // Clear all tasks from the list
  this.clearTasks = function () {
    this.tasks = [];
  };
}

// Initialize the TodoList object
var todoList = new TodoList();

// Print the list of actions that the user can perform
console.log("***************************");
console.log("Welcome to JS TODO-APP");
console.log("***************************");
console.log("Select an action:");
console.log("1) Add a new task");
console.log("2) List all tasks");
console.log("3) List completed tasks");
console.log("4) Mark a task as completed");
console.log("5) Delete a task");
console.log("6) Sort tasks by the due date");
console.log("7) Sort tasks by priority");
console.log("8) Clear all tasks");
console.log("***************************");

// Read input from the user and perform the selected action
console.log("what is your choice \n");
process.stdin.on("data", function (data) {
  var choice = parseInt(data.toString().trim());

  do {
    switch (choice) {
      case 1:
        // Add a new task
        console.log("Enter task description:");
        process.stdin.once("data", function (description) {
          console.log("Enter due date (YYYY-MM-DD):");
          process.stdin.once("data", function (dueDate) {
            console.log("Enter priority level (1-5):");
            process.stdin.once("data", function (priority) {
              var task = {
                description: description,
                due_date: dueDate,
                priority: parseInt(priority.toString().trim()),
                completed: false,
              };
              todoList.addTask(task);
              console.log("Task added successfully.");
            });
          });
        });
        break;

      case 2:
        // List all tasks
        var tasks = todoList.getTasks();
        console.log("All tasks:");
        for (var i = 0; i < tasks.length; i++) {
          var task = tasks[i];
          var status = task.completed ? "(completed)" : "";
          console.log(
            i +
              1 +
              ". " +
              task.description +
              " (due: " +
              task.due_date +
              ", priority: " +
              task.priority +
              ") " +
              status
          );
        }
        break;

      case 3:
        // List completed tasks
        var tasks = todoList.getTasks(true);
        console.log("Completed tasks:");
        for (var i = 0; i < tasks.length; i++) {
          var task = tasks[i];
          console.log(
            i +
              1 +
              ". " +
              task.description +
              " (due: " +
              task.due_date +
              ", priority: " +
              task.priority +
              ")"
          );
        }
        break;

      case 4:
        // Mark a task as completed
        console.log("Enter task description:");
        process.stdin.once("data", function (description) {
          todoList.markTaskAsCompleted(description.toString().trim());
          console.log("Task marked as completed.");
        });
        break;

      case 5:
        // Delete a task
        console.log("Enter task description:");
        process.stdin.once("data", function (description) {
          todoList.deleteTask(description.toString().trim());
          console.log("Task deleted.");
        });
        break;

      case 6:
        // Sort tasks by the due date
        todoList.sortTasks("due_date");
        console.log("Tasks sorted by the due date.");
        break;

      case 7:
        // Sort tasks by priority
        todoList.sortTasks("priority");
        console.log("Tasks sorted by priority.");
        break;

      case 8:
        // Clear all tasks
        todoList.clearTasks();
        console.log("All tasks cleared.");
        break;

      default:
        console.log("Invalid choice. Please try again.");
    }
  } while (choice >= 1 && choice <= 8);
});
