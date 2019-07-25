import { Injectable, OnDestroy } from '@angular/core';
import {
  Plugins,
  AppState,
  AppUrlOpen,
  PluginListenerHandle
} from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
const { App } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AppStateService implements OnDestroy {
  private $appStateChanged: BehaviorSubject<AppState> = new BehaviorSubject({
    isActive: true
  });

  $changed = this.$appStateChanged.asObservable();

  private handle: PluginListenerHandle;

  constructor() {
    this.setupStateListener();
  }

  ngOnDestroy(): void {
    this.handle.remove();
  }

  private setupStateListener() {
    this.handle = App.addListener('appStateChange', (state: AppState) => {
      console.log('app state change');
      this.$appStateChanged.next(state);
    });
  }
}
