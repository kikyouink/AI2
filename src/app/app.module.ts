import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Clipboard } from "@ionic-native/clipboard/ngx";
import { Toast } from '@ionic-native/toast/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../component/components.module'
import { PipesModule } from '../pipe/pipes.module';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        PipesModule,
        ComponentsModule
    ],
    providers: [
        StatusBar,
        Clipboard,
        Toast,
        Keyboard,
        AppMinimize,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
