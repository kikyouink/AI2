import { Component, OnInit, ChangeDetectorRef, ViewChild, ViewChildren, QueryList, ElementRef, ContentChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PainterService } from "../../service/painter";
import { SentenceService } from "../../service/sentence";
import { Clipboard } from "@ionic-native/clipboard/ngx";
import { RxjsService } from "../../service/rxjs";

declare var editormd: any;
declare var $ :any;
@Component({
    selector: 'app-markdown',
    templateUrl: './markdown.page.html',
    styleUrls: ['./markdown.page.scss'],
})
export class MarkdownPage implements OnInit {

    structure: boolean = false;
    abb: boolean = true;
    hide: boolean = true;
    paragraph: Array<any>;
    params: any;
    title: string;
    author: string;
    avatar: string;
    text: string = "";
    canvas: HTMLCanvasElement;
    mix: HTMLDivElement;
    btnBox: HTMLDivElement;
    buttons: any;
    constructor(
        public route: ActivatedRoute,
        public ref: ChangeDetectorRef,
        public sentence: SentenceService,
        public painter: PainterService,
        public rxjs: RxjsService,
        private clipboard: Clipboard
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.params = params;
            let content = this.params.content;
            let type = this.params.type;
            if (type) {
                this.structure = true;
                this.paragraph = JSON.parse(this.params.restore);
                var origin = '##';
                this.paragraph.map((i) => {
                    origin += i.word;
                })
                origin += '\n';
                content = origin + content;
            }
            this.title = this.params.title;
            this.avatar = this.params.avatar;
            this.author = this.params.author;
            this.text = content.replace(/---/g, "```").replace(/\s{12}/g, "\n");
            setTimeout(() => {
                this.markdown();
            }, 50)
        });


    }
    ngAfterViewInit() {
        let type = this.params.type;
        if (type) {
            this.canvas = $('canvas').get(0);
            this.mix = $('.mix').get(0);
            this.btnBox = $('.btnBox').get(0);
            this.buttons = $('.btnBox ion-button');
            setTimeout(() => {
                this.startPaint();
            }, 50)
        }
    }
    scrollHandler(event: any) {
        if (event.scrollTop > 120 && this.hide == true) this.hide = false;
        else if (event.scrollTop <= 120 && this.hide == false) this.hide = true;
        this.ref.detectChanges();
    }
    markdown() {
        editormd.markdownToHTML("editormd", {
            htmlDecode: "style,script,iframe",
            onload: function () {
                this.copy();
            }
        });
    }
    copy() {
        var code = this.params.code;
        this.clipboard.copy(code);
        this.rxjs.show('代码已复制');
    }
    startPaint() {
        this.painter.resize(this.canvas, this.btnBox);
        this.painter.clear(this.canvas);
        this.buttons.each((index, el) => {
            if ($(el).attr("head") != 0) {
                var parent = this.findParent($(el).attr("head"));
                this.painter.start(this.canvas, el, parent);
            }
        });
    }
    jumpTo(head) {
        var parent = this.findParent(head);
        if (parent)
            parent.scrollIntoView({
                behavior: "smooth"
            });
    }
    findParent(head) {
        var parent;
        this.buttons.each((index, el) => {
            if ($(el).attr("id") == head) parent = el;
        });
        return parent ? parent : null;
    }

}
