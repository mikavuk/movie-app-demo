import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogHelperService {
  constructor(private dialog: MatDialog) {}

  openAndRefetch<TData, TResult>(
    component: any,
    data: TData | null,
    refetchFn: () => Observable<TResult>,
    updateFn: (result: TResult) => void,
    dialogConfig: { minWidth?: string } = { minWidth: '300px' }
  ) {
    this.dialog
      .open(component, {
        ...dialogConfig,
        data,
      })
      .afterClosed()
      .pipe(
        switchMap(() => refetchFn()),
        tap(updateFn)
      )
      .subscribe();
  }
}
