import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { Task } from '../../Task';
import { faMultiply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent implements OnInit {
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  @Input() task: any;
  title: string = '';
  completed: boolean = false;
  date: string = '';
  time: string = '';
  id?: string;
  priority!: string;
  faMult = faMultiply;
  faEdit = faEdit;
  ngOnInit(): void {
    this.title = this.task.title;
    this.completed = this.task.done;
    // Convert "May 10 2025" to "2025-05-10" for Angular date pipe
    this.date = this.parseDate(this.task.date);
    this.time = this.task.time;
    this.id = this.task.id;
    this.priority = this.task.priority;
  }

  parseDate(dateStr: string): string {
    // Try to parse "May 10 2025" to "2025-05-10"
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      // Format as yyyy-MM-dd
      return parsed.toISOString().split('T')[0];
    }
    return dateStr;
  }

  onDelete(task: Task) {
    console.log(task);
    this.onDeleteTask.emit(task);
  }
  onEdit(task: Task) {
    console.log(task);
    this.onEditTask.emit(task);
  }
}
