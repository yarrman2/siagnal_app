import { Component } from '@angular/core';
import { SignalCompareComponent } from '../components/signals/signal-compare/signal-compare.component';
import { SignalComputedAbComponent } from '../components/signals/signal-computed-ab/signal-computed-ab.component';
import { SignalComputedCComponent } from '../components/signals/signal-computed-c/signal-computed-c.component';
import { SignalUsagesComponent } from '../components/signals/signal-usages/signal-usages.component';
import { SignalEffectsComponent } from '../components/signals/signal-effects/signal-effects.component';
import { SignalEffectsUsagesComponent } from '../components/signals/signal-effects-usages/signal-effects-usages.component';
import { SignalInteropComponent } from '../components/signals/signal-interop/signal-interop.component';
import { NgrxSignalStateComponent } from '../components/ngrx/ngrx-signal-state/ngrx-signal-state.component';
import { NgrxMethodsComponent } from '../components/ngrx/ngrx-methods/ngrx-methods.component';
import { NgrxSignalStoreAComponent } from '../components/ngrx/ngrx-signal-store-a/ngrx-signal-store-a.component';
import { NgrxSignalStoreBComponent } from '../components/ngrx/ngrx-signal-store-b/ngrx-signal-store-b.component';
import { NgrxSignalStoreCComponent } from '../components/ngrx/ngrx-signal-store-c/ngrx-signal-store-c.component';
import { NgrxSignalStoreDComponent } from '../components/ngrx/ngrx-signal-store-d/ngrx-signal-store-d.component';
import { NgrxSignalStoreEComponent } from '../components/ngrx/ngrx-signal-store-e/ngrx-signal-store-e.component';
import { NgrxSignalStoreFComponent } from '../components/ngrx/ngrx-signal-store-f/ngrx-signal-store-f.component';
import { NgrxSignalStoreGComponent } from '../components/ngrx/ngrx-signal-store-g/ngrx-signal-store-g.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SignalCompareComponent,
    SignalComputedAbComponent,
    SignalComputedCComponent,
    SignalUsagesComponent,
    SignalEffectsComponent,
    SignalEffectsUsagesComponent,
    SignalInteropComponent,
    NgrxSignalStateComponent,
    NgrxMethodsComponent,
    NgrxSignalStoreAComponent,
    NgrxSignalStoreBComponent,
    NgrxSignalStoreCComponent,
    NgrxSignalStoreDComponent,
    NgrxSignalStoreEComponent,
    NgrxSignalStoreFComponent,
    NgrxSignalStoreGComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'siagnal_app';
}
