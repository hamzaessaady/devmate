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
  isShowModal: boolean;
  isDeleteState: boolean;

  // Constructor and ngOnInit
  constructor(
    private logService: LogService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.isShowModal = false;
    this.isDeleteState = false;
    this.logService.getLogs().subscribe(data => this.logs = data);
    this.sharedService.currentLog$.subscribe(log => this.selectedLog = log);
  }

  // Remove log
  removeLog(log: Log): void {
    this.logService.deleteLog(log);
    this.sharedService.changeNotification("The Log is deleted successefully !");
    this.sharedService.changeCurrentLog({id: null, title: null, updatedAt: null});
    this.closeDeleteModal();
  }

  // Edit Log
  editLog(selectedLog: Log) {
    if(!this.isDeleteState) {
      this.sharedService.changeEditState(true);
      this.sharedService.changeCurrentLog(selectedLog);
    }
  }

  // show the Delete Modal
  showDeleteModal(log: Log) {
    this.isDeleteState = true;
    this.isShowModal = true;
    this.sharedService.changeCurrentLog(log); 
    this.sharedService.changeEditState(false);
  }

  // Close the Delete Modal
  closeDeleteModal(){
    this.isDeleteState = false;
    this.isShowModal = false; 
    this.sharedService.changeCurrentLog({id: null, title: null, updatedAt: null});
  }

}
