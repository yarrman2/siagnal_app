import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, effect, signal } from '@angular/core';

@Component({
  selector: 'signal-effects',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <h2>signal-effects</h2>

  `,
  styleUrl: './signal-effects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalEffectsComponent {
  s = signal(1);

  fieldEffect = effect(() => {
    console.log('field effect:',this.s());
  })

  constructor(
    private readonly injector: Injector,
  ) {
    effect(() => {
      console.log('constructor effect: ', this.s());
      setTimeout(() => {
        this.setMethodEffect(injector);
      }, 1000);
    });
  }

  setMethodEffect(injector: Injector) {
    effect(() => {
      console.log('method effect: ', this.s());
    }, {injector});
  }
}
