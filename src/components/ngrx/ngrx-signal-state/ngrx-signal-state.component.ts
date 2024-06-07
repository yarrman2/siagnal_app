import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { patchState, signalState } from '@ngrx/signals';

@Component({
  selector: 'ngrx-signal-state',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  template: `<h2>ngrx signal state!</h2>
   Is show:  {{state.isShow()}}

   <br>
   a {{state.a() | json}}
   <br>
   a.b {{state.a.b() | json}}
   <br>
   a.b.c {{state.a.b.c()}}
   <br>
    <button (click)="changeC()">click</button>
  `,
  styleUrl: './ngrx-signal-state.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgrxSignalStateComponent {
  state = signalState({
    isShow: false,
    a: {
      b: {
        c: 100,
      }
    }
  });

  changeC(){
    // if (this.state.a.b.c() + 1 > 103) {
    //   patchState(this.state, {isShow: true});
    // }
    patchState(this.state, (val) => ({
      ...val,
      isShow: val.a.b.c + 1 > 103 ? true : false,
      a: {
        ...val.a,
        b: {
          ...val.a.b,
          c: val.a.b.c + 1,
        }
      }
    }));
  }
}
