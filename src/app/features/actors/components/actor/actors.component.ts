import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject, debounceTime, switchMap, tap } from 'rxjs';
import { Actor } from '../../models/actor.model';
import { ActorsService } from '../../services/actors.service';
import { ActorDialogComponent } from '../actor-dialog/actor-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogHelperService } from 'src/app/shared/utils/dialog-helper.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnInit {
  actors$ = new BehaviorSubject<Actor[]>([]);
  formGroup!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private actorsService: ActorsService,
    private dialogHelper: DialogHelperService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({ name: [''] });
    this.listenToFilters();
    this.fetchActors();
  }

  ngOndestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  listenToFilters(): void {
    this.formGroup.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(filters => this.actorsService.getAllWithSearch(filters)),
        tap(actors => this.actors$.next(actors))
      )
      .subscribe();
  }

  fetchActors(): void {
    this.actorsService
      .getAllWithSearch({ name: this.formGroup.value })
      .pipe(tap(actors => this.actors$.next(actors)))
      .subscribe();
  }

  addNew(): void {
    this.dialogHelper.openAndRefetch(
      ActorDialogComponent,
      null,
      () => this.actorsService.getAllWithSearch(this.formGroup.value),
      actors => this.actors$.next(actors)
    );
  }
}
