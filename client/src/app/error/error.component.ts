import { Component, OnInit } from '@angular/core';
import { AlertComponent } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  alerts: any[] = [];

  constructor() { }

  ngOnInit(): void {

  }
 
  showError(message: any): void {
    console.log(this.alerts)
    this.alerts.push({
      type: 'info',
      msg: message,
      timeout: 5000
    });
    console.log(this.alerts)
  }
 
  onClosed(dismissedAlert: AlertComponent): void {
    console.log('')
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

}
