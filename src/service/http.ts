import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RxjsService } from '../service/rxjs'

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    aiUrl: string = 'http://106.13.54.47:8000/get/';
    constructor(
        private http: HttpClient,
        private rxjs: RxjsService,
    ) { }
    // get(text) {
    //     var url = this.aiUrl + text;
    //     console.log(url);

    //     return this.http.get(url);
    // }
    post(text) {
        var url = this.aiUrl;
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
