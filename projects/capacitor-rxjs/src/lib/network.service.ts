import { Injectable } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Plugins, NetworkStatus } from '@capacitor/core';
import { bindCallback, Subject, Observable, from, BehaviorSubject } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

const { Network } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  $status: BehaviorSubject<NetworkStatus> = new BehaviorSubject(null);
  $networkStatusChange: Observable<NetworkStatus>;
  $connected: Observable<NetworkStatus>;
  $disconnected: Observable<NetworkStatus>;
  $error: BehaviorSubject<Error> = new BehaviorSubject(null);

  constructor() {
    this.setupObservables();
    this.getStatus();
  }
  async getStatus() {
    try {
      const status = await Network.getStatus();
      this.$status.next(status);
      return status;
    } catch (err) {
      this.$error.next(err);
      console.error(err);
    }
  }

  private setupObservables() {
    const callback = bindCallback(Network.addListener);
    this.$networkStatusChange = callback('networkStatusChange').pipe(
      tap(ev => this.$status.next(ev[0]))
    );

    this.$connected = this.$networkStatusChange.pipe(
      filter(s => s.connected === true)
    );
    this.$disconnected = this.$networkStatusChange.pipe(
      filter(s => s.connected === false)
    );
  }
}
