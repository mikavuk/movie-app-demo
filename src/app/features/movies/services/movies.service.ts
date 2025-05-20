import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { ApiService } from 'src/app/core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MoviesService extends ApiService<Movie> {
  constructor(http: HttpClient) {
    super(http, 'movies');
  }

  getAllWithSearch(filter: { title?: string; year?: string; rate?: string }): Observable<Movie[]> {
    const queryMap = {
      ...(filter.title ? { title_like: filter.title } : {}),
      ...(filter.year !== undefined ? { year_like: filter.year } : {}),
      ...(filter.rate !== undefined ? { rate: filter.rate } : {}),
    };

    return super.getAll(queryMap);
  }
}
