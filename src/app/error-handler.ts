import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

  handleError(err: any) {
    alert(JSON.stringify(err));

    super.handleError(err);
  }
}
