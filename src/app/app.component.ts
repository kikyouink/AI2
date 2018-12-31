import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { MenuController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Pro } from '@ionic/pro';
import { RxjsService } from '../service/rxjs'

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    bg: string = 'slide';
    avatar: string = "test";
    blur: boolean = true;
    userName: string = "你的名字";
    sign: boolean = true;
    items: Array<any> = [
        {
            icon: 'ios-code',
            name: '关于',
            link: '/about',
        },
        {
            icon: 'logo-github',
            name: 'Github',
            link: 'https://github.com/q2578443177/AI2',
        },
    ];
    constructor(
        private platform: Platform,
        private menuCtrl: MenuController,
        private router: Router,
        private rxjs: RxjsService,
        private splash: SplashScreen,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.splash.hide();
            this.sync();
        });
    }
    async sync() {
        try {
            const currentVersion = await Pro.deploy.getCurrentVersion();
            const resp = await Pro.deploy.sync({ updateMethod: 'auto' });
            if (currentVersion.versionId !== resp.versionId) {
                this.rxjs.show('一项更新已经安装完毕', 'web');
            } else {
                console.log('无可用更新');
            }
        } catch (err) {
            Pro.monitoring.exception(err);
        }
    }
    moveTo(link) {
        this.menuCtrl.close();
        if (/\./.test(link)) {
            location.href = link;
        }
        else this.router.navigateByUrl(link);
    }
}
