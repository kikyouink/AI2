import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../service/http";
import { CodeService } from "../../service/code";
import { SentenceService } from "../../service/sentence";

declare var $: any;
@Component({
    selector: 'app-ai',
    templateUrl: './ai.page.html',
    styleUrls: ['./ai.page.scss'],
})
export class AiPage implements OnInit {
    text: any;
    des: string = '';
    loading: boolean = false;
    constructor(
        private http: HttpService,
        private code: CodeService,
        private sentence: SentenceService
    ) { }
    ngOnInit() {
        this.des=localStorage.getItem('des')||'你可以将一张红色牌当【杀】使用';
    }
    prepareData() {
        this.text = $('.text');
        this.text.eq(0).blur();
        this.loading = true;
        this.postData();
    }
    postData() {
        var msg = this.text.text();
        localStorage.setItem('des',msg);
        var replace = this.sentence.getReplace(msg);
        this.http.post(replace).subscribe(res => {
            console.log(res);
            return this.handleData(res);
        });
    }
    handleData(res) {
        var json = this.sentence.deepCopy(res["items"]);
        var restore = this.sentence.getRestore(json);
        this.loading = false;
        this.code.start(restore);
    }

}
