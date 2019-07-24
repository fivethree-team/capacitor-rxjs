import { Injectable } from '@angular/core';
import { Plugins, AppState, AppUrlOpen } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
const { App } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  $appStateChanged: BehaviorSubject<AppState> = new BehaviorSubject({
    isActive: true
  });

  $backButton: BehaviorSubject<AppUrlOpen> = new BehaviorSubject(null);

  constructor() {
    this.setupStateListener();
  }

  private setupStateListener() {
    App.addListener('appStateChange', (state: AppState) => {
      console.log('app state change');
      this.$appStateChanged.next(state);
    });

    App.addListener('backButton', (ev: AppUrlOpen) => {
      console.log('back button');
      this.$backButton.next(ev);
    });
  }
}
