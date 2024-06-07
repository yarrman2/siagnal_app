import { ChangeDetectionStrategy, Component, computed, signal, untracked } from '@angular/core';
import { interval, take, tap } from 'rxjs';

@Component({
  selector: 'signal-computed-c',
  standalone: true,
  template: `
    <h2>equal and utracked</h2>
    <p>even {{ signalWithCheck().count }}</p>
    <hr />
    <h2>untracked</h2>
    a: {{a()}}, b: {{b()}}, c: {{c()}}
  `,
  styleUrl: './signal-computed-c.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalComputedCComponent {
  signalWithCheck = signal(
    { count: 0 },
    {
      equal: (val1, val2) => {
        console.log(val1, val2);
        return val1.count == val2.count;
      },
    }
  );

  a = signal(0);
  b = signal(0);
  c = computed(() => untracked(this.a) + this.b() )

  constructor() {
    interval(500)
      .pipe(
        tap(() => {
          const newVal = Math.floor(Math.random() * 3);
          this.signalWithCheck.set({ count: newVal });
        }),
        take(20)
      )
      .subscribe();

      /** untracked */
      interval(567).pipe(take(25)).subscribe(() => {
        this.a.update(val => val + 1)
      });
      interval(3045).pipe(take(10)).subscribe(() => {
        this.b.update(val => val + 1)
      });
  }
}
