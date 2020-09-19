import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Log } from '../models/log';


@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[];

  constructor() { 
    this.logs = [
      {title: 'Create log component', updatedAt: new Date("2020-09-12")},
      {title: 'Add Services', updatedAt: new Date("1/2/2020")},
      {title: 'Set Routes', updatedAt: new Date("1/3/2020")}
    ];
  }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  addLog(log: Log): void {
    this.logs.unshift(log);
  }
}
