import { Injectable } from '@angular/core';
import { SentenceService } from "../service/sentence";
import { RxjsService } from '../service/rxjs';
@Injectable({
    providedIn: 'root'
})
export class EnableService {

    skill: any = {};
    constructor(
        public sentence: SentenceService,
        public rxjs: RxjsService,
    ) { }
    decompose(){
        //第一件事就是分离
        this.sentence.getDecompose();
    }
    getWhen() {
        this.skill.enable = "phaseUse";
    }
    getFilter() {
        var bool = false, assume;
        var fit = this.sentence.getFilter('', 'ADV', 'c');
        console.log(fit);

        if (fit) {
            fit.map((i) => {
                if (this.sentence.getTranslation(i) == 'if') {
                    bool = true;
                    assume = i;
                    return;
                }
            })
            console.log(assume);
        }
        else bool = false;
        if (bool == false) return;


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

    }
    getContent() {

    }
    start() {
        console.log('开始编写主动技');
        this.decompose();
        // this.getWhen();
        // this.getFilter();
        // this.getFilterTarget();
        return null;
        // return this.skill;
    }
}
