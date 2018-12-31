import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { Toast } from '@ionic-native/toast/ngx';

@Injectable({
    providedIn: 'root'
})
export class RxjsService {

    subject: any;
    constructor(
        private mtoast: Toast,

    ) {
        this.subject = new Subject<any>();
    }

    sendMsg(msg, type?, callback?) {
        this.subject.next({
            msg: msg,
            callback: callback,
        });
    }
    getMsg(): Observable<any> {
        return this.subject;
    }
    show(msg){
        console.log(msg);
        this.mtoast.show(msg, '3000', 'bottom').subscribe(toast => {
                console.log(toast);
            }
        );
    }
}
