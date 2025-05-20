import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject, debounceTime, switchMap, takeUntil, tap } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { DialogHelperService } from 'src/app/shared/utils/dialog-helper.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies$ = new BehaviorSubject<Movie[]>([]);
  filtersForm!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private moviesService: MoviesService,
    private dialogHelper: DialogHelperService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.listenToFilters();
    this.fetchMovies();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(): void {
    this.filtersForm = this.formBuilder.group({
      title: [''],
      year: [''],
      rate: [''],
      actors: [],
    });
  }

  listenToFilters(): void {
    this.filtersForm.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(filters => this.moviesService.getAllWithSearch(filters)),
        tap(movies => this.movies$.next(movies)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  fetchMovies(): void {
    this.moviesService
      .getAllWithSearch(this.filtersForm.value)
      .pipe(
        tap(movies => this.movies$.next(movies)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  preview(id: number): void {
    const movie = this.movies$.getValue().find(m => m.id === id);
    this.dialogHelper.openAndRefetch(
      MovieDialogComponent,
      { movie },
      () => this.moviesService.getAllWithSearch(this.filtersForm.value),
      movies => this.movies$.next(movies)
    );
  }

  delete(id: number): void {
    this.moviesService
      .delete(id.toString())
      .pipe(
        switchMap(() => this.moviesService.getAllWithSearch(this.filtersForm.value)),
        tap(movies => this.movies$.next(movies)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  add(): void {
    this.dialogHelper.openAndRefetch(
      MovieDialogComponent,
      { movie: null },
      () => this.moviesService.getAllWithSearch(this.filtersForm.value),
      movies => this.movies$.next(movies)
    );
  }
}
