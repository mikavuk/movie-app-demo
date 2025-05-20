import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Actor } from '../../../actors/models/actor.model';
import { ActorsService } from '../../../actors/services/actors.service';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  movie: Movie;
}

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss'],
})
export class MovieDialogComponent implements OnInit, OnDestroy {
  actors$!: Observable<Actor[]>;
  submitted = false;
  formGroup!: FormGroup;
  isMoviePreview = false;

  private destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private moviesService: MoviesService,
    private actorsService: ActorsService,
    private dialogRef: MatDialogRef<MovieDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.actors$ = this.actorsService.getAllWithSearch();
    this.isMoviePreview = this.data.movie != null ? true : false;
    this.formGroup = this.initFormGroup();
    this.initMovieData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initFormGroup() {
    return this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      year: [
        null,
        [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())],
      ],
      actors: [[], [Validators.required, Validators.minLength(1)]],
      rate: [1, [Validators.min(1), Validators.max(10)]],
    });
  }

  initMovieData() {
    if (this.data.movie) {
      this.formGroup.patchValue({
        ...this.data.movie,
        actors: this.data.movie.actors || [],
        rate: this.data.movie.rate || 1,
      });
    }
  }
  get headerTitle(): string {
    return !this.isMoviePreview ? 'Add new movie' : `Edit movie with id = ${this.data.movie.id}`;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  submit(): void {
    this.submitted = true;
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) return;

    const movieData = this.formGroup.value;

    const request$ = this.isMoviePreview
      ? this.moviesService.edit(this.data.movie.id.toString(), movieData)
      : this.moviesService.create(movieData);

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => console.error('Failed to save movie', err),
    });
  }

  delete(): void {
    if (!this.data.movie?.id) return;

    this.moviesService
      .delete(this.data.movie.id.toString())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error('Failed to delete movie', err),
      });
  }
}
