import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

import { Log } from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // Observable sources
  private editStateSource = new BehaviorSubject<boolean>(false);
  private currentLogSource = new BehaviorSubject<Log>({id: -1, title: '', updatedAt: null});

  // Observable streams
  editState$ = this.editStateSource.asObservable();
  currentLog$ = this.currentLogSource.asObservable();
  
  // Service message commands
  changeEditState(value: boolean){
    this.editStateSource.next(value);
  }

  changeCurrentLog(log: Log){
    this.currentLogSource.next(log);
  }
  
}
