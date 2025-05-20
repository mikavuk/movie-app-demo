import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actor } from '../models/actor.model';
import { ApiService } from 'src/app/core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActorsService extends ApiService<Actor> {
  constructor(http: HttpClient) {
    super(http, 'actors');
  }

  getAllWithSearch(filter?: { name?: string }): Observable<Actor[]> {
    const query = {
      ...(filter?.name ? { name_like: filter.name } : {}),
    };
    return super.getAll(query);
  }
}
