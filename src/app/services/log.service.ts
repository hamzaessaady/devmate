import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Log } from '../models/log';


@Injectable({
  providedIn: 'root'
})
export class LogService {

  // Attributes
  devmateData: any;

  // Constructor
  constructor() {
    if(localStorage.getItem('devmate') == null){
      this.devmateData = {
        lastId: -1,
        logs: new Array
      };
      localStorage.setItem('devmate', JSON.stringify(this.devmateData));
    } else {
      this.devmateData = JSON.parse(localStorage.getItem('devmate'));
    }
  }

  // GET all logs
  getLogs(): Observable<Log[]> {
    return of(this.devmateData.logs);
  }

  // POST a log
  addLog(log: Log): void {
    log.id = ++this.devmateData.lastId;
    this.devmateData.logs.unshift(log);
    localStorage.setItem('devmate', JSON.stringify(this.devmateData));
  }

  // DELETE a log
  deleteLog(logToDelete: Log): void {
    this.devmateData.logs.forEach((log, index) => {
      if(logToDelete.id === log.id) this.devmateData.logs.splice(index, 1);
    });
    localStorage.setItem('devmate', JSON.stringify(this.devmateData));
  }

  // PUT a log
  updateLog(editedLog: Log): Observable<Log>{
    editedLog.updatedAt = new Date();
    this.devmateData.logs.forEach((log, index) => {
      if(editedLog.id === log.id) this.devmateData.logs.splice(index, 1);
    });
    this.devmateData.logs.unshift(editedLog);
    localStorage.setItem('devmate', JSON.stringify(this.devmateData));

    return of(editedLog);
  }
}
