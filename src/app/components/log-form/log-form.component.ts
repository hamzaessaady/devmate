import { Component, OnInit, ViewChild } from '@angular/core';

import { Log } from 'src/app/models/log';
import { LogService } from 'src/app/services/log.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss']
})
export class LogFormComponent implements OnInit {

  // Attributes
  log: Log;
  previousLog: Log;
  isEditState: boolean;
  logsCount: number;
  @ViewChild('logForm') form: any;

  // Constructor and ngOnInit
  constructor(
    private logService: LogService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.sharedService.editState$.subscribe(value => this.isEditState = value);
    this.sharedService.currentLog$.subscribe(log => {
      this.log = log;
      this.previousLog = JSON.parse(JSON.stringify(this.log));
    });
    this.sharedService.logsCount$.subscribe(value => this.logsCount = value);
  }

  // On Submit : add new log
  onSubmit({value, valid}: {value: Log, valid: boolean}): void {
    if (valid) {
      value.updatedAt = new Date();
      this.logService.addLog(value);
      this.form.reset();
      this.sharedService.changelogsCount(this.logsCount + 1);
      this.sharedService.changeNotification("The new Log is added successefully !");
    }
  }

  // Update log
  updateLog() {
    this.logService.updateLog(this.log).subscribe((log) => {
      this.sharedService.changeEditState(false);
      this.sharedService.changeCurrentLog({id: -1, title: '', updatedAt: null});
      this.sharedService.changeNotification("The Log is updated successefully!");
    });
  }

  // CancelEdit
  cancelEdit(){
    this.log.title = this.previousLog.title;
    this.sharedService.changeEditState(false);
    this.sharedService.changeCurrentLog({id: null, title: null, updatedAt: null});
  }

}
