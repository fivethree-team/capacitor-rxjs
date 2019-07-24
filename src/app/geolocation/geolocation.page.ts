import { GeolocationService } from '@fivethree/capacitor-rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss']
})
export class GeolocationPage implements OnInit {
  constructor(public geolocation: GeolocationService) {}

  async ngOnInit() {
    this.geolocation.$coordinates.subscribe(console.log);
  }
}
