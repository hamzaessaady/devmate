import { Component, OnInit } from '@angular/core';

import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'devmate';
  notification: string;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.notification$.subscribe(message => {
      this.notification = message;
      setTimeout(() => {
        this.notification = null;
      }, 2000);
    });
  }

  hideNotification() {
    this.sharedService.changeNotification(null);
  }
}
