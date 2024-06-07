import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'signal-effects-usages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  template: `
  <h2>signal effects usages!</h2>
  <input [ngModel]='text()' (ngModelChange)="text.set($event)" />
  `,
  styleUrl: './signal-effects-usages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalEffectsUsagesComponent {
  text = signal('');
  textEffect = effect(() => {
    console.log(this.text())
    window.localStorage.setItem('textKey', this.text());
  });
 }
