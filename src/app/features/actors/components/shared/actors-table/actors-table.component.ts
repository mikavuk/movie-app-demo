import { Component, Input } from '@angular/core';
import { Actor } from '../../../models/actor.model';

@Component({
  selector: 'app-actors-table',
  templateUrl: './actors-table.component.html',
  styleUrls: ['./actors-table.component.scss'],
})
export class ActorsTableComponent {
  @Input() actors: Actor[] | null = [];
}
