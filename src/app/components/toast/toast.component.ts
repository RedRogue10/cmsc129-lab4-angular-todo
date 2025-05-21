import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  imports: [CommonModule, FormsModule],
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() visible: boolean = false;
  @Output() undo = new EventEmitter<void>();
  onUndo() {
    this.undo.emit();
  }
}
