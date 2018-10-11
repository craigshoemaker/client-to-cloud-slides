import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor() { }

  get(key: string, replacements?: IReplaceable[] ) {
    const func = window['api'][key].toString();
    const segments = func.split('// ---');
    let code = segments[1];
    code = code.replace(/^\s+|\s+$/g, '');
    code = code.replace(/\s*console\.log\(.*?\);?/gm, '');

    if (replacements) {
      replacements.forEach(item => {
        code = code.replace(item.pattern, item.value);
      });
    }

    return code;
  }
}


export interface IReplaceable {
  pattern: string;
  value: string;
}
