import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-filter-bar',
  templateUrl: './movie-filter-bar.component.html',
  styleUrls: ['./movie-filter-bar.component.scss'],
})
export class MovieFilterBarComponent {
  @Input() form!: FormGroup;
  @Output() add = new EventEmitter<void>();
}
