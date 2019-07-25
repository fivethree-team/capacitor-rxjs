import { Injectable, OnDestroy } from '@angular/core';
import { Plugins, GeolocationPosition } from '@capacitor/core';
import { BehaviorSubject, bindCallback, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService implements OnDestroy {
  private $geolocationCoordinates: BehaviorSubject<
    GeolocationPosition
  > = new BehaviorSubject(null);
  $coordinates = this.$geolocationCoordinates.asObservable();
  private $geolocationError: BehaviorSubject<Error> = new BehaviorSubject(null);
  $error = this.$geolocationError.asObservable();

  private watchID: string;

  constructor() {
    this.watchPosition();
    this.getCurrentPosition();
  }

  ngOnDestroy(): void {
    Geolocation.clearWatch({ id: this.watchID });
  }

  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.$geolocationCoordinates.next(coordinates);
    } catch (err) {
      this.$geolocationError.next(err);
      console.log('Error getting current position', err);
    }
  }

  watchPosition() {
    this.watchID = Geolocation.watchPosition({}, (position, err) => {
      if (!err) {
        this.$geolocationCoordinates.next(position);
      } else {
        this.$geolocationError.next(err);
        console.log('Error watching for Geolocation', err);
      }
    });
  }
}
