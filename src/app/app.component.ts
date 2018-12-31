import { Component } from '@angular/core';

import { MenuController,Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    items: Array<any> = [
        {
            icon: 'ios-code',
            name: '关于',
            link: '/about',
        },
        {
            icon: 'logo-github',
            name: 'Github',
            link: 'https://github.com/q2578443177/AI',
        },
    ];
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private menuCtrl: MenuController,
        private router: Router,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.backgroundColorByHexString('#ffffff00');
            this.splashScreen.hide();
        });
    }
    moveTo(link) {
        this.menuCtrl.close();
        if (/\./.test(link)) {
            location.href = link;
        }
        else this.router.navigateByUrl(link);
    }
}
