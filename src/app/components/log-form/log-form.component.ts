import { Component, OnInit, ViewChild } from '@angular/core';

import { Log } from 'src/app/models/log';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss']
})
export class LogFormComponent implements OnInit {

  // Attributes
  log: Log;
  @ViewChild('logForm') form: any;

  // Constructor and ngOnInit
  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.log = {
      id: -1,
      title: '',
      updatedAt: null
    }
  }

  // On Submit : add new log
  onSubmit({value, valid}: {value: Log, valid: boolean}): void {
    if (valid) {
      value.updatedAt = new Date();
      this.logService.addLog(value);
      this.form.reset();
    }
  }

}
