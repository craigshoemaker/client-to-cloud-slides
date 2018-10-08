import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  constructor() { }

  getName(): string {
    const userAgent = window.navigator.userAgent;
    let name = '';

    if (/opr/ig.test(userAgent)) {
      name = 'Opera';
    } else if (/firefox/ig.test(userAgent)) {
      name = 'Firefox';
    } else if (/chrome/ig.test(userAgent)) {
      name = 'Chrome';
    }

    return name;

  }
}
