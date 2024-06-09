import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  merge,
  fromEvent,
  Observable,
  Observer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  public lastupdated$: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );
  public cmdReload$: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );
  doReload() {
    this.cmdReload$.next(null);
  }

  checkNetworkStatus() {
    return merge(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }

  constructor() {}
}
