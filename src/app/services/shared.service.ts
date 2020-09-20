import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject} from 'rxjs';

import { Log } from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // Observable sources
  private editStateSource = new BehaviorSubject<boolean>(false);
  private currentLogSource = new BehaviorSubject<Log>({id: -1, title: '', updatedAt: null});
  private notificationSource = new Subject<string>();
  private logsCountSource = new BehaviorSubject<number>(0);

  // Observable streams
  editState$ = this.editStateSource.asObservable();
  currentLog$ = this.currentLogSource.asObservable();
  notification$ = this.notificationSource.asObservable();
  logsCount$ = this.logsCountSource.asObservable();
  
  // Service message commands
  changeEditState(value: boolean){
    this.editStateSource.next(value);
  }

  changeCurrentLog(log: Log){
    this.currentLogSource.next(log);
  }

  changeNotification(message: string){
    this.notificationSource.next(message);
  }

  changelogsCount(value: number){
    this.logsCountSource.next(value);
  }
  
}
