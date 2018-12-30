import { Injectable } from '@angular/core';
import { SentenceService } from "../service/sentence";
import { RxjsService } from '../service/rxjs';
@Injectable({
    providedIn: 'root'
})
export class EnableService {

    list = []
    constructor(
        public sentence: SentenceService,
        public rxjs: RxjsService,
    ) {
        console.log('Hello EnableService Service');
    }
    start() {
        console.log('开始编写主动技');
        this.getAction();
        this.getSource();
        this.getFilterTarget();
    }
    getAction() {
        var action;
        var HED = this.sentence.getHED();
        var DBL = this.sentence.getChildren(HED, 'DBL');
        if (DBL) {
            action = this.sentence.getFilter(DBL, '', 'v');
            action = this.sentence.getTranslation(action);
        }
        else {
            action = this.sentence.getTranslation(HED);
        }
        console.log('动作:');
        console.log(action);
        return action;
    }
    getSource() {
        var SBV = this.sentence.getFilter('', 'SBV', 'n');
        var source = this.sentence.getTranslation(SBV);
        console.log('发起者:');
        console.log(source);
        return source;
    }
    getFilterTarget() {
        var target, filter = '';
        var HED = this.sentence.getHED();
        var DBL = this.sentence.getChildren(HED, 'DBL', 'n');
        var ADV = this.sentence.getChildren(HED, 'ADV', 'p');
        var VOB = this.sentence.getChildren(HED, 'VOB', 'n');
        if (DBL) {
            target = DBL;
            var ATT = this.sentence.getATT(target, 'n/r/m');
            if (ATT) ATT.map((i) => {
                switch (i.postag) {
                    case 'm': console.log(this.sentence.getTranslation(i)); break;
                    case 'r': filter += `if(target==player) return false;\n`; break;
                    default: console.log(i);
                }
            })
            filter += `return true;\n`;
        }
        else if (ADV) {
            target = this.sentence.getChildren(ADV, 'POB', 'n');
            var ATT = this.sentence.getATT(target, 'n/r/m');
            if (ATT) ATT.map((i) => {
                switch (i.postag) {
                    case 'm': console.log(this.sentence.getTranslation(i)); break;
                    case 'r': filter += `if(target==player) return false;\n`; break;
                    default: console.log(i);
                }
            })
            filter += `return true;\n`
        }
        else if (VOB) {
            var ATT = this.sentence.getATT(VOB, 'n/r/m');
            if (ATT) ATT.map((i) => {
                switch (i.postag) {
                    case 'm': console.log(this.sentence.getTranslation(i)); break;
                    case 'r': filter += `if(target==player) return false;\n`; break;
                    case 'n': target = i; break;
                    default: console.log(i);

                }
            })
            filter += `return true;\n`
        }
        console.log('合理目标:');
        console.log(filter);
        console.log(target);
    }
    getContent() {

    }
}
