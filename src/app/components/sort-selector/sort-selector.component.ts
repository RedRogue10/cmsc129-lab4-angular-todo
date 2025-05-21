import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule

@Component({
  selector: 'app-sort-selector',
  standalone: true,
  imports: [FormsModule], // <-- Add FormsModule here
  templateUrl: './sort-selector.component.html',
  styleUrl: './sort-selector.component.css',
})
export class SortSelectorComponent {
  sortBy: string = 'duedate';
  order: string = 'asc';

  @Output() sortChange = new EventEmitter<{ sortBy: string; order: string }>();

  onSortChange() {
    this.sortChange.emit({ sortBy: this.sortBy, order: this.order });
  }
}
