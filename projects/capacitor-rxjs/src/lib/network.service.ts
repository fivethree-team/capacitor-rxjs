import { Injectable, OnDestroy } from '@angular/core';
import { Plugins, NetworkStatus } from '@capacitor/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PluginListenerHandle } from '@capacitor/core/dist/esm/web/network';

const { Network } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NetworkService implements OnDestroy {
  private $networkStatusChange = new BehaviorSubject<NetworkStatus>(null);
  $status: Observable<NetworkStatus> = this.$networkStatusChange.asObservable();
  $connected: Observable<NetworkStatus>;
  $disconnected: Observable<NetworkStatus>;
  private $networkError: Subject<Error> = new Subject();
  $error = this.$networkError.asObservable();

  private handle: PluginListenerHandle;

  constructor() {
    this.setupObservables();
    this.getStatus();
  }

  ngOnDestroy(): void {
    this.handle.remove();
  }

  async getStatus() {
    try {
      const status = await Network.getStatus();
      this.$networkStatusChange.next(status);
      return status;
    } catch (err) {
      this.$networkError.next(err);
      console.error(err);
    }
  }

  private setupObservables() {
    this.handle = Network.addListener('networkStatusChange', status => {
      this.$networkStatusChange.next(status);
    });

    this.$networkStatusChange.subscribe();

    this.$connected = this.$networkStatusChange.pipe(
      filter(s => s.connected === true)
    );
    this.$disconnected = this.$networkStatusChange.pipe(
      filter(s => s.connected === false)
    );
  }
}
