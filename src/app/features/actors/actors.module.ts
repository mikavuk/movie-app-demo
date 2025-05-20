import { NgModule } from '@angular/core';
import { ActorsComponent } from './components/actor/actors.component';
import { ActorDialogComponent } from './components/actor-dialog/actor-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActorsRoutingModule } from './actors-routing.module';
import { ActorsFilterBarComponent } from './components/shared/actors-filter-bar/actors-filter-bar.component';
import { ActorsTableComponent } from './components/shared/actors-table/actors-table.component';

@NgModule({
  declarations: [
    ActorsFilterBarComponent,
    ActorsTableComponent,
    ActorsComponent,
    ActorDialogComponent,
  ],
  imports: [SharedModule, ReactiveFormsModule, CommonModule, ActorsRoutingModule],
})
export class ActorsModule {}
