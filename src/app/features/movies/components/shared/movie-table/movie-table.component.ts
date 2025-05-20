import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.scss'],
})
export class MovieTableComponent {
  @Input() movies: Movie[] | null = [];
  @Output() preview = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
}
