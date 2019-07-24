import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Subject } from 'rxjs';

const { Browser } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  private $browserFinishedSubject = new Subject();
  $finished = this.$browserFinishedSubject.asObservable();
  private $browserPageLoaded = new Subject();
  $pageLoaded = this.$browserPageLoaded.asObservable();

  constructor() {
    this.setupListeners();
  }

  setupListeners() {
    Browser.addListener('browserFinished', info => {
      this.$browserFinishedSubject.next(info);
    });

    Browser.addListener('browserPageLoaded', info => {
      this.$browserPageLoaded.next(info);
    });
  }
}
