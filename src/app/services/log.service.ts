import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Log } from '../models/log';


@Injectable({
  providedIn: 'root'
})
export class LogService {

  // Attributes
  logs: Log[];

  // Constructor
  constructor() { 
    this.logs = [
      {id:2, title: 'Set Routes', updatedAt: new Date("1/3/2020")},
      {id:1, title: 'Add Services', updatedAt: new Date("1/2/2020")},
      {id:0, title: 'Create log component', updatedAt: new Date("2020-09-12")},
    ];
  }

  // GET all logs
  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  // POST a log
  addLog(log: Log): void {
    log.id = this.logs.length == 0 ? 0 : this.logs[0].id + 1;
    this.logs.unshift(log);
    console.log(this.logs);
  }

  // DELETE a log
  deleteLog(logToDelete: Log): void {
    this.logs.forEach((log, index) => {
      if(logToDelete.id === log.id) this.logs.splice(index, 1);
    });
  }

  // PUT a log
  updateLog(editedLog: Log): Observable<Log>{
    editedLog.updatedAt = new Date();
    this.deleteLog(editedLog);
    this.logs.unshift(editedLog);

    return of(editedLog);
  }
}
