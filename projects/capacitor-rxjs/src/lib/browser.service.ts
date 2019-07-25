import { Injectable, OnDestroy } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { PluginListenerHandle } from '@capacitor/core';

const { Browser } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class BrowserService implements OnDestroy {
  private $browserFinishedSubject = new BehaviorSubject(null);
  $finished = this.$browserFinishedSubject.asObservable();
  private $browserPageLoaded = new BehaviorSubject(null);
  $pageLoaded = this.$browserPageLoaded.asObservable();
  private handles: PluginListenerHandle[] = [];
  constructor() {
    this.setupListeners();
  }

  ngOnDestroy(): void {
    this.handles.forEach(handle => handle.remove());
  }

  setupListeners() {
    const finished = Browser.addListener('browserFinished', info => {
      this.$browserFinishedSubject.next(info);
    });

    const pageLoaded = Browser.addListener('browserPageLoaded', info => {
      this.$browserPageLoaded.next(info);
    });

    this.handles.push(finished, pageLoaded);
  }
}
