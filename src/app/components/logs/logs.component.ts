import { Component, OnInit } from '@angular/core';

import { Log } from 'src/app/models/log';
import { LogService } from 'src/app/services/log.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  // Attributes
  logs: Log[];
  selectedLog: Log;

  // Constructor and ngOnInit
  constructor(
    private logService: LogService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.logService.getLogs().subscribe(data => this.logs = data);
    this.sharedService.currentLog$.subscribe(log => this.selectedLog = log);
  }

  // Remove log
  removeLog(log: Log): void {
    this.logService.deleteLog(log);
    this.sharedService.changeNotification("The Log is deleted successefully !");
  }

  // Edit Log
  editLog(selectedLog: Log) {
    this.sharedService.changeEditState(true);
    this.sharedService.changeCurrentLog(selectedLog);
  }

}
