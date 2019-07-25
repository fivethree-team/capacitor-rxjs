import { KeyboardService } from './../../../projects/capacitor-rxjs/src/lib/keyboard.service';
import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Keyboard } = Plugins;

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.page.html',
  styleUrls: ['./keyboard.page.scss']
})
export class KeyboardPage implements OnInit {
  constructor(public keyboard: KeyboardService) {}

  ngOnInit() {
    this.keyboard.$didHide.subscribe(() => console.log('keyboard did hide'));
    this.keyboard.$didShow.subscribe(ev =>
      console.log('keyboard did show with height', ev)
    );
    this.keyboard.$willHide.subscribe(() => console.log('keyboard will hide'));
    this.keyboard.$willShow.subscribe(ev =>
      console.log('keyboard will show with height', ev)
    );
  }

  async show() {
    return Keyboard.show();
  }

  async hide() {
    return Keyboard.hide();
  }

  async showAccessoryBar() {
    return Keyboard.setAccessoryBarVisible({ isVisible: true });
  }

  async hideAccessoryBar() {
    return Keyboard.setAccessoryBarVisible({ isVisible: false });
  }
}
