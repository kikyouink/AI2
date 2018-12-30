import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { RxjsService } from '../service/rxjs'

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    basicUrl: string = 'https://aip.baidubce.com/rpc/2.0/nlp/v1/depparser?charset=UTF-8&access_token=';
    token: string = '24.9ef1d08dd86089475358c1055f47716a.2592000.1546273111.282335-15004681';
    apiUrl: string = this.basicUrl + this.token;
    githubUrl: string = "https://raw.githubusercontent.com/q2578443177/AI/master/";
    githubReleaseUrl: string = "https://raw.githubusercontent.com/q2578443177/AI/master/app-debug.apk";
    nodeUrl: string = "http://localhost:3000";
    plt: string;
    constructor(
        private platform: Platform,
        private http: HttpClient,
        private rxjs: RxjsService,
    ) { }
    get(url) {
    }
    post(text) {
        var url = this.nodeUrl;
        var body = {
            "text": text
        }
        var options = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        return this.http.post(url, body, options)
    }
}
