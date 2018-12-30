import { Injectable } from '@angular/core';
import { Observable, Subject, pipe } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RxjsService {

    subject: any;
    constructor(
    ) {
        this.subject = new Subject<any>();
    }

    sendMsg(msg, type?, callback?) {
        this.subject.next({
            msg: msg,
            type: type,
            callback: callback,
        });
    }

    clearMsg() {
        this.subject.next();
    }

    getMsg(): Observable<any> {
        return this.subject.asObservable();
    }
}
