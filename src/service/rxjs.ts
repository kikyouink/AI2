import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Toast } from '@ionic-native/toast/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class RxjsService {

    subject: any;
    constructor(
        private mtoast: Toast,
        public toast: ToastController

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
    async show(msg, type = 'm') {
        if (type == 'm') {
            this.mtoast.show(msg, '3000', 'bottom').subscribe(toast => {
                console.log(toast);
            });
        }
        else {
            const toast = await this.toast.create({
                message: msg,
                position: 'top',
                mode:'ios',
            });
            toast.present();
        }
    }
}
