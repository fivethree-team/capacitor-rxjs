import { Injectable, OnDestroy } from '@angular/core';
import {
  Plugins,
  LocalNotificationActionPerformed,
  LocalNotification,
  PluginListenerHandle
} from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
const { LocalNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService implements OnDestroy {
  private $localNotificationsActionPerformed = new BehaviorSubject<
    LocalNotificationActionPerformed
  >(null);
  $actionPerformed = this.$localNotificationsActionPerformed.asObservable();
  private $localNotificationReceived = new BehaviorSubject<LocalNotification>(
    null
  );
  $received = this.$localNotificationReceived.asObservable();

  private handles: PluginListenerHandle[] = [];

  constructor() {
    this.setupListeners();
  }

  ngOnDestroy(): void {
    this.handles.forEach(h => h.remove());
  }

  setupListeners() {
    const actionPerformed = LocalNotifications.addListener(
      'localNotificationActionPerformed',
      (action: LocalNotificationActionPerformed) => {
        this.$localNotificationsActionPerformed.next(action);
      }
    );

    const received = LocalNotifications.addListener(
      'localNotificationReceived',
      (notification: LocalNotification) => {
        this.$localNotificationReceived.next(notification);
      }
    );

    this.handles.push(actionPerformed, received);
  }
}
