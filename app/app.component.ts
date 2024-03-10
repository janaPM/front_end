// app.component.ts
import { Component } from '@angular/core';

interface Task {
  description: string;
  startDate: Date;
  targetDate: Date;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: Task[] = [];
  taskDescription: string = '';
  taskStartDate: Date;
  taskEndDate: Date;
  filterOption: string = 'all';

  constructor() {
    this.taskStartDate = new Date();
    this.taskEndDate = new Date();
  }

  addTask() {
    const newTask: Task = {
      description: this.taskDescription,
      startDate: this.taskStartDate,
      targetDate: this.taskEndDate,
      completed: false
    };
    this.tasks.push(newTask);
    this.taskDescription = '';
    this.taskStartDate = new Date();
    this.taskEndDate = new Date();
  }

  deleteTask(index: number): void {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
    }
  }

  confirmDeleteTask(index: number): void {
    const isConfirmed = confirm('Are you sure you want to delete this task?');

    if (isConfirmed) {
      this.deleteTask(index);
    }
  }

  isOverdue(task: Task): boolean {
    return task.targetDate < new Date() && !task.completed;
  }

  filteredTasks(): Task[] {
    if (this.filterOption === 'completed') {
      return this.tasks.filter(task => task.completed);
    } else if (this.filterOption === 'pending') {
      return this.tasks.filter(task => !task.completed);
    } else {
      return this.tasks;
    }
  }

  toggleTaskStatus(task: Task): void {
    task.completed = !task.completed;
  }
}
