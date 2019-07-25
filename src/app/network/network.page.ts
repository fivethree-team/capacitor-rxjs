import { Component, OnInit } from '@angular/core';
import { NetworkService } from '@fivethree/capacitor-rxjs';

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss']
})
export class NetworkPage implements OnInit {
  constructor(public network: NetworkService) {}

  ngOnInit(): void {
    this.network.$status.subscribe(console.log);
  }
}
