import { Component } from '@angular/core';
import { BplErrorReportService } from 'projects/bpl-error-report/src/public-api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'bpl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'error-report';

  constructor(private bplErrorReportService: BplErrorReportService, private httpClient: HttpClient) {

  }

  info(): void {
    this.bplErrorReportService.info('this is info');
  }

  caughtError(): void {
    let a;

    a.length;
  }

  connectionFailed(): void {
    let request = {name: 'this is name', age: 22};
    this.httpClient.post('https://www.google.com.sg/events', request).subscribe(el => {

    });
  }

}
