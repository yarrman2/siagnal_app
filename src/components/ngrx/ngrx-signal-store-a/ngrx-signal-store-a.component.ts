import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { storeA } from './store';

@Component({
  selector: 'ngrx-signal-store-a',
  standalone: true,
  templateUrl: './ngrx-signal-store-a.component.html',
  styleUrl: './ngrx-signal-store-a.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    storeA,
  ]
})
export class NgrxSignalStoreAComponent {
  store = inject(storeA);
 }
