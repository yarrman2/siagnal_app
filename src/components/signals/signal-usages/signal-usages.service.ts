import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalUsagesService {

  value = signal(1);
  change() {
    setTimeout(() => {
      this.value.update(val => val + 1);
    }, 1000);
  }
}
