import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { MenuController, Platform } from '@ionic/angular';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { PlatformLocation } from '@angular/common';
import { Pro } from '@ionic/pro';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { RxjsService } from '../service/rxjs'

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    bg: string = 'ai';
    avatar: string = "ai";
    blur: boolean = true;
    userName: string = "嗨~主人";
    sign: boolean = true;
    keyboardShow: boolean = false;
    @ViewChild('menu') menu:MenuController
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
        private rxjs: RxjsService,
        private splash: SplashScreen,
        private location: PlatformLocation,
        private appMinimize: AppMinimize,
        private keyboard: Keyboard
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            if (this.platform.is('cordova')) {
                
                this.splash.hide();
                this.sync();
                this.keyboard.onKeyboardShow().subscribe(() => {
                    this.keyboardShow = true;
                })
                this.platform.backButton.subscribe(() => {
                    console.log(this.location.pathname);
                    this.menu.isOpen().then(data => {
                        if(data==true) this.menu.close();
                    })
                    if (this.keyboardShow) {
                        this.keyboard.hide();
                        this.keyboardShow = false;
                    }
                    else if (this.location.pathname == "/tabs/AI" || this.location.pathname == "/tabs/Book" || this.location.pathname == "/tabs") {
                        this.appMinimize.minimize();
                    }
                })
            }
        });
    }
    async sync() {
        try {
            const currentVersion = await Pro.deploy.getCurrentVersion();
            const resp = await Pro.deploy.sync({ updateMethod: 'background' });
            if (!currentVersion||currentVersion.versionId != resp.versionId) {
                console.log('已安装更新');
                this.rxjs.show('一项更新已经安装完毕,将在下次启动时可用', 'web');
            } else {
                console.log('无可用更新 ');
            }
        } catch (err) {
            console.log(err);
        }
    }
    moveTo(link) {
        this.menuCtrl.close();
        if (/\./.test(link)) {
            location.href = link;
        }
        else this.rxjs.sendPage(link);
    }
}
