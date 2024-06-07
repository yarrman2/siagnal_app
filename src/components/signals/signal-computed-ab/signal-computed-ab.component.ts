import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, interval, map, take, tap } from 'rxjs';

@Component({
  selector: 'signal-computed-ab',
  standalone: true,
  imports: [
    AsyncPipe,
  ],
  template: `
    <h2>Computed</h2>
    <div>
      <h3> Signals </h3>
      <p>
        A: {{signalA()}} x B: {{signalB()}} = {{signalMul()}}
      </p>
    </div>
    <div>
      <h3> Rx </h3>
      <p>
        A: {{rxA.getValue()}} x B: {{rxB.getValue()}} = {{rxMul | async}}
      </p>
    </div>


  `,
  styleUrl: './signal-computed-ab.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalComputedAbComponent {
  signalA = signal(0);
  signalB = signal(0);

  signalMul = computed(() => this.signalA() * this.signalB());

  mulEffect = effect(() => {
    console.log('signal mul: ', this.signalMul());
  })

  rxA = new BehaviorSubject(0);
  rxB = new BehaviorSubject(0);

  rxMul = combineLatest([this.rxA, this.rxB]).pipe(
    tap((([a, b]) => console.log('rx a, b: ', a, b ))),
    map(([a, b]) => a * b),
    tap((mul => console.log('rx mul: ', mul)))
  );

  constructor() {
    interval(1000)
    .pipe(
      tap(() => {
        /** signal  */
        this.signalA.update(val => val + 1);
        this.signalB.update(val => val + 1);
        /** rx */
        this.rxA.next(this.rxA.getValue() + 1);
        this.rxB.next(this.rxB.getValue() + 1);
      }),
      // takeUntilDestroyed(),
      take(20)
    ).subscribe();
  }
}

