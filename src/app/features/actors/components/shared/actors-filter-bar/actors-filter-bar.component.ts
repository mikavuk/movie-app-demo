import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-actors-filter-bar',
  templateUrl: './actors-filter-bar.component.html',
  styleUrls: ['./actors-filter-bar.component.scss'],
})
export class ActorsFilterBarComponent {
  @Input() form!: FormGroup;
  @Output() add = new EventEmitter<void>();
}
