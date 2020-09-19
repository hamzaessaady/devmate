import { Component, OnInit } from '@angular/core';

import { Log } from 'src/app/models/log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss']
})
export class LogFormComponent implements OnInit {

  log: Log;

  constructor() { }

  ngOnInit(): void {
    this.log = {
      title: '',
      updatedAt: null
    }
  }

  onSubmit({value, valid}: {value: Log, valid: boolean}): void {
    if (valid) {
      value.updatedAt = new Date();
      console.log(value);
    }
  }

}
