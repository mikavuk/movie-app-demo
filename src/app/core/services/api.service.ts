import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class ApiService<T> {
  private readonly fullBaseUrl: string;

  constructor(protected http: HttpClient, endpoint: string) {
    this.fullBaseUrl = `${environment.apiBaseUrl}${endpoint}`;
  }

  protected buildParams(filter: Record<string, any>): HttpParams {
    let params = new HttpParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    return params;
  }

  getAll(filter: Record<string, any> = {}): Observable<T[]> {
    const params = this.buildParams(filter);
    return this.http.get<T[]>(this.fullBaseUrl, { params }).pipe(catchError(this.handleError));
  }

  getSingle(id: string): Observable<T> {
    return this.http.get<T>(`${this.fullBaseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  create(data: Partial<T>): Observable<T> {
    return this.http.post<T>(this.fullBaseUrl, data).pipe(catchError(this.handleError));
  }

  edit(id: string, data: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.fullBaseUrl}/${id}`, data).pipe(catchError(this.handleError));
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.fullBaseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  protected handleError(error: any): Observable<never> {
    console.error('[ApiService] Error occurred:', error);
    return throwError(() => error);
  }
}
