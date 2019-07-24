import { Injectable } from '@angular/core';
import { Plugins, GeolocationPosition } from '@capacitor/core';
import { BehaviorSubject, bindCallback, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  $coordinates: BehaviorSubject<GeolocationPosition> = new BehaviorSubject(
    null
  );
  $error: BehaviorSubject<Error> = new BehaviorSubject(null);

  constructor() {
    this.watchPosition();
    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.$coordinates.next(coordinates);
    } catch (err) {
      this.$error.next(err);
      console.log('Error getting current position', err);
    }
  }

  watchPosition() {
    Geolocation.watchPosition({}, (position, err) => {
      if (!err) {
        this.$coordinates.next(position);
      } else {
        this.$error.next(err);
        console.log('Error watching for Geolocation', err);
      }
    });
  }
}
