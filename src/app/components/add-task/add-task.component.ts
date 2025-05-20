import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  title!: string;
  date!: string;
  time!: string;
  prio!: string;
  done: boolean = false;
  onSubmit() {
    if (!this.title) {
      alert('Add a task!');
      return;
    }
    const formattedDate = formatDate(this.date, 'MMMM dd yyyy', 'en-US');
    const newTask = {
      title: this.title,
      date: formattedDate,
      time: this.time,
      priority: this.prio,
      done: false,
    };
    this.onAddTask.emit(newTask);
    this.title = '';
    this.date = '';
    this.time = '';
    this.prio = '';
  }
}
