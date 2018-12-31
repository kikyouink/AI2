import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

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
        private statusBar: StatusBar,
        private menuCtrl: MenuController,
        private router: Router,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // this.statusBar.backgroundColorByHexString('#ffffff00');
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
