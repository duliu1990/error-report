# bpl-error-report

This Lib provides custom Error Report support for NG applications.

# Overview

Ng client for collection window.onerror, http and script error.

# Quickstart

You can manual report or handler the error.



## Installing the client library

`npm i bpl-error-report --save`



## Manual Report



```typescript
@Component({
  selector: 'bpl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'error-report';

  constructor(private bplErrorReportService: BplErrorReportService, private httpClient: HttpClient) {
this.bplErrorReportService.init({ projectId: '1232', reportUrl: 'http://localhost:7001/event' });
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
```



## Config ErrorHandler

The default implementation of `ErrorHandler` prints error messages to the `console`. To intercept error handling, write a custom exception handler that replaces this default as appropriate for your app.

```typescript
@Injectable()
export class BplErrorHandler implements ErrorHandler {

    constructor(private bplErrorReportService: BplErrorReportService) {
        this.bplErrorReportService.init({ projectId: '1232', reportUrl: 'http://localhost:7001/event' });
    }

    handleError(err: any): void {
        this.bplErrorReportService.notifyError(err);
    }

}

@NgModule({
  providers: [{provide: ErrorHandler, useClass: BplErrorHandler}]
})
class MyModule {}
```



# Update log

1. 0.0.1

   Initial the project

2. 0.0.2

   Implement basic functions



# License

Apache Version 2.0