import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, take } from 'rxjs';

@Component({
  selector: 'signal-interop',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<h2>signal interop!</h2>
    To signal: {{toS()}}
    <br>
    To observable: {{toObs | async}}
  `,
  styleUrl: './signal-interop.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalInteropComponent {
  toS = toSignal(interval(1000).pipe(take(10)), {initialValue: -1});

  toObs = toObservable(this.toS);
}
