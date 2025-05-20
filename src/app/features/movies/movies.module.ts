import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieDialogComponent } from './components/movie-dialog/movie-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { MoviesRoutingModule } from './movies-routing.module';
import { MovieFilterBarComponent } from './components/shared/movie-filter-bar/movie-filter-bar.component';
import { MovieTableComponent } from './components/shared/movie-table/movie-table.component';

@NgModule({
  declarations: [
    MoviesComponent,
    MovieDialogComponent,
    MovieFilterBarComponent,
    MovieTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    MoviesRoutingModule,
    FormsModule,
  ],
})
export class MoviesModule {}
