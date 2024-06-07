import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, computed, inject, signal } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, BehaviorSubject, interval, map, take } from 'rxjs';

@Component({
  selector: 'destroy-check',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>destroy-check works!</p>`,
  styleUrl: './destroy-check.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestroyCheckComponent {
  injector = inject(Injector);
  plainRx = rxMethod<{ source: string; val: number }>(
    pipe(
      tap(({ source, val }) => console.log(`from ${source}: ${val}`)),
      tapResponse({
        next(value) {},
        error() {},
        complete () {
          console.log('completed');
        },
        finalize() {
          console.log('finalize');
        },
      })
    )
  );

  subj = new BehaviorSubject(0);
  sig = signal(100);
  sigComputed = computed(() => ({
    source: 'signal',
    val: this.sig(),
  }));

  constructor() {
    this.plainRx({ source: 'primitive', val: 1 });

    this.plainRx(
      interval(1000).pipe(
        map((val) => ({
          source: 'observable',
          val,
        })),
        // take(2)
      )
    );

    this.plainRx(this.sigComputed);
    setTimeout(() => {this.sig.set(200)}, 3_500);

    setTimeout(() => {
      this.plainRx.unsubscribe();
      this.plainRx({source: 'restart', val: 1000})
    }, 2_000);

    this.addAnotherRx()('another 1');
    this.addAnotherRx()('another k');
  }


  addAnotherRx(){
    return rxMethod<string>(pipe(
      tap((val) => {
        console.log(val)
      }),
      tapResponse({
        next() {},
        error() {},
        finalize() {
          console.log('another finalize');
        },
      }),
    ), {injector: this.injector});
  }
}
