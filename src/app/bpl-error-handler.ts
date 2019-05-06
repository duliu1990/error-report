import { ErrorHandler, Injectable } from '@angular/core';
import { BplErrorReportService } from 'projects/bpl-error-report/src/public-api';

@Injectable()
export class BplErrorHandler implements ErrorHandler {

    constructor(private bplErrorReportService: BplErrorReportService) {
        this.bplErrorReportService.init({ projectId: 'BP1232', reportUrl: 'http://localhost:7001/event' });
    }

    handleError(err: any): void {
        this.bplErrorReportService.notifyError(err);
    }

}