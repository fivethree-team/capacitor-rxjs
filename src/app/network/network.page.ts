import { Component } from '@angular/core';
import { NetworkService } from '@fivethree/capacitor-rxjs';

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss']
})
export class NetworkPage {
  constructor(public network: NetworkService) {
    network.$networkStatusChange.subscribe(res => console.log(res));
  }
}
