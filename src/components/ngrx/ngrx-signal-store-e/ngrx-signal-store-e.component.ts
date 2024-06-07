import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { storeE } from './store';

@Component({
  selector: 'ngrx-signal-store-e',
  standalone: true,
  templateUrl: './ngrx-signal-store-e.component.html',
  styleUrl: './ngrx-signal-store-e.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    storeE
  ]
})
export class NgrxSignalStoreEComponent {
  store = inject(storeE);
 }
