import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from '../../services/task-service.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { SortSelectorComponent } from '../sort-selector/sort-selector.component';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    AddTaskComponent,
    TaskItemComponent,
    CommonModule,
    EditPopupComponent,
    SortSelectorComponent,
    ToastComponent, // <-- Add here
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  showAddTask: boolean = false;
  showEditTask: boolean = false;
  taskToEdit!: Task;
  subscription!: Subscription;

  // Add these properties to track sort state
  sortBy: string = 'duedate';
  order: string = 'asc';

  showToast: boolean = false;
  toastMessage: string = '';
  private deletedTask: Task | null = null;
  private toastTimeout: any;

  constructor(private taskService: TaskService, private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {
    this.getTasks();
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }
  deleteTask(task: Task) {
    this.deletedTask = task;
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
      this.showUndoToast('Task deleted.'); // Show toast
    });
  }
  editTask(task: Task) {
    this.taskToEdit = task;
    this.showEditTask = true;
  }

  closeEditPopup() {
    this.showEditTask = false;
    this.getTasks();
  }
  closeAddTask() {
    this.showAddTask = false;
  }

  onSortChange(sort: { sortBy: string; order: string }) {
    this.sortBy = sort.sortBy;
    this.order = sort.order;
    this.sortTasks();
  }

  sortTasks() {
    if (!this.tasks) return;

    if (this.sortBy === 'priority') {
      const priorityOrder: Record<string, number> = {
        high: 1,
        medium: 2,
        low: 3,
      };
      this.tasks.sort((a, b) =>
        this.order === 'asc'
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority]
      );
    } else if (this.sortBy === 'duedate') {
      this.tasks.sort((a, b) => {
        const dateA = new Date(a.date + ' ' + (a.time || '')).getTime();
        const dateB = new Date(b.date + ' ' + (b.time || '')).getTime();
        return this.order === 'asc' ? dateA - dateB : dateB - dateA;
      });
    } else if (this.sortBy === 'dateadded') {
      this.tasks.sort((a, b) => {
        const dateA = new Date(a.dateAdded || 0).getTime();
        const dateB = new Date(b.dateAdded || 0).getTime();
        return this.order === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.sortTasks();
    });
  }

  showUndoToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
      this.deletedTask = null; // Clear after toast disappears
    }, 3000); // 3 seconds
  }

  undoDelete() {
    if (this.deletedTask) {
      this.taskService.addTask(this.deletedTask).subscribe((task) => {
        this.tasks.push(task);
        this.sortTasks();
        this.showToast = false;
        this.deletedTask = null;
        if (this.toastTimeout) {
          clearTimeout(this.toastTimeout);
        }
      });
    }
  }
}
