import { Component } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-filter-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './filter-button.component.html',
  styleUrl: './filter-button.component.css',
})
export class FilterButtonComponent {
  filterIcon = faFilter;
}
