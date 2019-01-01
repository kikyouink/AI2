import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Toast } from '@ionic-native/toast/ngx';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class RxjsService {

    msgSubject: any;
    navSubject: any;
    constructor(
        private mtoast: Toast,
        private toast: ToastController,
        private navCtrl: NavController,

    ) {
        this.msgSubject = new Subject<any>();
        this.navSubject = new BehaviorSubject<any>(0);
    }

    sendMsg(msg, type?, callback?) {
        this.msgSubject.next({
            msg: msg,
            callback: callback,
        });
    }
    getMsg(): Observable<any> {
        return this.msgSubject;
    }
    sendPage(page, params?){
        this.navSubject.next(params);
        this.navCtrl.navigateForward(page);
    }
    getpage(): Observable<any> {
        return this.navSubject;
    }
    show(msg, type = 'm') {
        if (type == 'm') {
            this.mtoast.show(msg, '3000', 'bottom').subscribe(toast => {
                console.log(toast);
            });
        }
        else {
            this.tp(msg);
        }
    }
    async tp(msg) {
        const toast = await this.toast.create({
            message: msg,
            position: 'top',
            mode: 'ios',
            duration: 3000,
        });
        toast.present();
    }
}
