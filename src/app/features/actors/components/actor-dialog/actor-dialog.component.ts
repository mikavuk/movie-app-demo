import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../../movies/components/movie-dialog/movie-dialog.component';
import { ActorsService } from '../../services/actors.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-actor-dialog',
  templateUrl: './actor-dialog.component.html',
  styleUrls: ['./actor-dialog.component.scss'],
})
export class ActorDialogComponent implements OnInit, OnDestroy {
  submitted = false;
  formGroup!: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private actorsService: ActorsService,
    private dialogRef: MatDialogRef<ActorDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit(): void {
    this.submitted = true;
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) return;

    const formValue = this.formGroup.value;

    this.actorsService
      .create(formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: () => console.error('Failed to create an actor'),
      });
  }
}
