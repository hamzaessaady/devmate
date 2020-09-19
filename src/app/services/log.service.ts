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
      {id:2, title: 'Set Routes', updatedAt: new Date("1/3/2020")},
      {id:1, title: 'Add Services', updatedAt: new Date("1/2/2020")},
      {id:0, title: 'Create log component', updatedAt: new Date("2020-09-12")},
    ];
  }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  addLog(log: Log): void {
    log.id = this.logs[0].id + 1;
    this.logs.unshift(log);
  }
}
