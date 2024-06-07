import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { BehaviorSubject, interval, map, pipe, take, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { DestroyCheckComponent } from './destroy-check/destroy-check.component';
@Component({
  selector: 'ngrx-methods',
  standalone: true,
  imports: [CommonModule, DestroyCheckComponent],
  template: `<h2>ngrx methods!</h2>
    <button (click)="toggle()">toggle: {{show()}}</button>
    @if(show()){
      <destroy-check />
    }
  `,
  styleUrl: './ngrx-methods.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgrxMethodsComponent {
  show = signal(false);

  toggle() {
    this.show.set(!this.show())
  }
}
