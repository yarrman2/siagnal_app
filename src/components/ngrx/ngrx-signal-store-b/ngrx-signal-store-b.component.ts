
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { storeB } from './store';

@Component({
  selector: 'ngrx-signal-store-b',
  standalone: true,
  templateUrl: './ngrx-signal-store-b.component.html',
  styleUrl: './ngrx-signal-store-b.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    storeB,
  ]
})
export class NgrxSignalStoreBComponent {
  store = inject(storeB);
 }
