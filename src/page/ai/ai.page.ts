import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HttpService } from "../../service/http";
import { CodeService } from "../../service/code";
import { SentenceService } from "../../service/sentence";
@Component({
    selector: 'app-ai',
    templateUrl: './ai.page.html',
    styleUrls: ['./ai.page.scss'],
})
export class AiPage implements OnInit {

    plt: string;
    loading: boolean = false;
    @ViewChild("text") text: ElementRef;

    constructor(
        public http: HttpService,
        public code: CodeService,
        public sentence: SentenceService
    ) { }
    ngOnInit() { }
    prepareData() {
        this.loading = true;
        this.text.nativeElement.blur();
        this.postData();
    }
    postData() {
        var msg = this.text.nativeElement.textContent;
        var replace = this.sentence.getReplace(msg);
        this.http.post(replace).subscribe(res => {
            return this.handleData(res);
        });
    }
    handleData(res) {
        var json = this.sentence.deepCopy(res["items"]);
        json = this.sentence.getRestore(json);
        this.loading = false;
        this.code.start(json);
    }

}
