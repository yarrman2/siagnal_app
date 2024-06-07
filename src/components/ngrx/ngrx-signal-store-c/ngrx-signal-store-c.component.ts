
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { storeC } from './store';

@Component({
  selector: 'ngrx-signal-store-c',
  standalone: true,
  templateUrl: './ngrx-signal-store-c.component.html',
  styleUrl: './ngrx-signal-store-c.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    storeC,
  ]
})
export class NgrxSignalStoreCComponent {
  store = inject(storeC);
 }
