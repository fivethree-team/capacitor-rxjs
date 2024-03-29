import { AppStateService } from '@fivethree/capacitor-rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app',
  templateUrl: './app.page.html',
  styleUrls: ['./app.page.scss']
})
export class AppPage implements OnInit {
  constructor(public appState: AppStateService) {}

  async ngOnInit() {
    this.appState.$changed.subscribe(console.log);
  }
}
