import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private _loaderState = new BehaviorSubject<boolean>(false);
  private requestQueue = 0;

  constructor() {}

  get loaderState(): Observable<boolean> {
    return this._loaderState.asObservable();
  }

  setBusy() {
    this._loaderState.next(true);
    this.requestQueue++;
  }

  setIdle() {
    if (this.requestQueue > 0) {
      this.requestQueue--;
    }

    if (this.requestQueue === 0) {
      this._loaderState.next(false);
    }
  }
}
