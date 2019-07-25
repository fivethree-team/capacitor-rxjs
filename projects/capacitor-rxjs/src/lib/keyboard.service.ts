import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService implements OnDestroy {
  private $keyboardWillShow = new BehaviorSubject<Event>(null);
  private $keyboardWillHide = new BehaviorSubject<Event>(null);
  private $keyboardDidShow = new BehaviorSubject<Event>(null);
  private $keyboardDidHide = new BehaviorSubject<Event>(null);
  $willShow: Observable<Event> = this.$keyboardWillShow.asObservable();
  $willHide: Observable<Event> = this.$keyboardWillHide.asObservable();
  $didShow: Observable<Event> = this.$keyboardDidShow.asObservable();
  $didHide: Observable<Event> = this.$keyboardDidHide.asObservable();

  constructor() {
    this.setupListeners();
  }

  ngOnDestroy(): void {
    window.removeEventListener('keyboardWillShow', () => {});
    window.removeEventListener('keyboardDidShow', () => {});
    window.removeEventListener('keyboardWillHide', () => {});
    window.removeEventListener('keyboardDidHide', () => {});
  }

  setupListeners() {
    window.addEventListener('keyboardWillShow', e => {
      this.$keyboardWillShow.next(e);
    });

    window.addEventListener('keyboardDidShow', e => {
      this.$keyboardDidShow.next(e);
    });

    window.addEventListener('keyboardWillHide', () => {
      this.$keyboardWillHide.next(null);
    });

    window.addEventListener('keyboardDidHide', () => {
      this.$keyboardDidHide.next(null);
    });
  }
}
