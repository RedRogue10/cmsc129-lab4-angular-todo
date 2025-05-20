import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../Task';
import { TaskService } from '../../services/task-service.service';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css',
})
export class EditPopupComponent {
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Input() task!: Task;

  constructor(private taskService: TaskService) {}

  onSave() {
    this.taskService.updateTask(this.task).subscribe(() => {
      this.onClose.emit();
    });
  }

  onCancel() {
    this.onClose.emit();
  }
}
