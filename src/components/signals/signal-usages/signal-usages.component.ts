import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { SignalUsagesService } from './signal-usages.service';

@Component({
  selector: 'signal-usages',
  standalone: true,
  providers: [
    SignalUsagesService,
  ],
  template: `
    <h2>Signal Usages </h2>

    <p>
      Field: <b> {{field()}}</b>
    </p>

    <p>
      From service: <b> {{service.value()}} </b>
      <button (click)="service.change()">Change</button>
    </p>
     
    <p>
      Like getter: {{ likeGetter() }}
    </p>

  `,
  styleUrl: './signal-usages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalUsagesComponent { 
  service = inject(SignalUsagesService);
  field = signal(`I am field`);

  likeGetter = computed(() =>  Array.from({length: this.service.value()})
    .map(_=>'!')
    .join('') 
  );
}
