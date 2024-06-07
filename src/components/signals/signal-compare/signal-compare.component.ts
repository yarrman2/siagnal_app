import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, interval, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'signal-compare',
  standalone: true,
  imports: [
    AsyncPipe,
  ],
  template: `
    <h2>signal compare</h2>
    <div>
      <div>
        Rx Counter getter: {{rxCounter.getValue()}}
        Rx Counter async: {{rxCounter | async}}
        Signal {{signalCounter()}}
      </div>
    <button (click)="increment()"> inc </button>
    <button (click)="decrement()"> dec </button>
    <hr>
      <span>rx tick getter:  {{rxTick.getValue()}} </span>
      <span>rx tick async:  {{rxTick | async}} </span>
      <span>signal tick:  {{signalTick()}} </span>
    </div>
  `,
  styleUrl: './signal-compare.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalCompareComponent {
  signalCounter: WritableSignal<number> = signal(0);
  rxCounter: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  signalTick = signal(0);
  rxTick = new BehaviorSubject(0);


  constructor() {
    interval(1000)
    .pipe(
      tap(() => {
        this.rxTick.next(this.rxTick.getValue() + 1);
        this.signalTick.update(state => state + 1);
      }),
      // takeUntilDestroyed(),
      take(20),
    )
    .subscribe()
  }

  increment() {
    this.rxCounter.next(this.rxCounter.getValue() + 1);
    this.signalCounter.set(this.signalCounter() + 1);
  }
  decrement() {
    this.rxCounter.next( this.rxCounter.getValue() - 1);
    this.signalCounter.update(counter => counter - 1);
  }
}
