import { Injectable } from '@angular/core';
import { ViewAsService } from '../service/view-as'
import { SentenceService } from "../service/sentence"
import { RxjsService } from "../service/rxjs";
import { EnableService } from "../service/enable"
import { TriggerService } from "../service/trigger"

@Injectable({
    providedIn: 'root'
})
export class CodeService {

    constructor(
        public viewAs: ViewAsService,
        public enable: EnableService,
        public trigger: TriggerService,
        public sentence: SentenceService,
        public rxjs: RxjsService,

    ) { }

    start(json) {
        console.log('coding...');
        console.log(json);
        this.sentence.receiveJson(json);
        var type = this.judgeType(json);
        console.log(this.sentence.json);
        switch (type) {
            case "viewAs": this.viewAs.start(); break;
            case "enable": this.enable.start(); break;
            case "trigger": this.trigger.start(); break;
            default: this.quit();
        }
    }
    getPassages() {

    }
    judgeType(json) {
        return this.judgeViewAs(json) ? "viewAs" : this.judgeEnable(json) ? "enable" : this.judgeTrigger(json) ? "trigger" : this.quit();

    }
    judgeViewAs(json) {
        var BA = json.some((i) => {
            return i.deprel == "BA"
        });
        var HED = this.sentence.getHED();
        if (BA && HED[0].postag == 'v') return true;
    }
    judgeEnable(json) {
        var TMP = this.sentence.getFilter('', 'TMP', 'n');
        var when = this.sentence.getChildren(TMP, 'ATT', 'b');
        if (this.sentence.getTranslation(when) == 'phaseUse') return true;
        return false;
    }
    judgeTrigger(json) {
        return false;
    }
    quit() {
        this.rxjs.sendMsg('无法判断类型');
        return;
    }
}
