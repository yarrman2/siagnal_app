import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { storeD } from './store';

@Component({
  selector: 'ngrx-signal-store-d',
  standalone: true,
  templateUrl: './ngrx-signal-store-d.component.html',
  styleUrl: './ngrx-signal-store-d.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    storeD,
  ]
})
export class NgrxSignalStoreDComponent {
  store = inject(storeD);
 }
