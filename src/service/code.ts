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

    start(paragraph) {
        console.log('coding...');
        var skill;
        var type = this.judgeType(paragraph);
        switch (type) {
            case "viewAs": skill = this.viewAs.start(); break;
            case "enable": skill = this.enable.start(); break;
            case "trigger": skill = this.trigger.start(); break;
            default: skill = null; this.rxjs.show('无法判断类型', 'web');
        }
        this.done(skill);
    }
    judgeType(paragraph) {
        return this.judgeViewAs(paragraph) ? "viewAs" : this.judgeEnable(paragraph) ? "enable" : this.judgeTrigger(paragraph) ? "trigger" : null;
    }
    judgeViewAs(paragraph) {
        var BA = paragraph.some((i) => {
            return i.deprel == "BA"
        });
        var HED = this.sentence.getHED();
        if (BA && HED[0].postag == 'v') return true;
    }
    judgeEnable(paragraph) {
        var TMP = this.sentence.getFilter('', 'TMP', 'n');
        var when = this.sentence.getChildren(TMP, 'ATT', 'b');
        if (this.sentence.getTranslation(when) == 'phaseUse') return true;
        return false;
    }
    judgeTrigger(paragraph) {
        return false;
    }
    done(skill) {
        if (skill) {
            var code = this.sentence.getConversion(skill);
            var content = "---javascript\n" + code + "\n---\n";
        }
        else content = "";
        var restore = this.sentence.getRestore(this.sentence.paragraph);
        var decompose = this.sentence.decompose;
        this.rxjs.sendPage('/markdown', {
            type: 'code',
            title: "转换结果",
            author: "AI",
            avatar: "ai",
            content: content,
            source: code,
            restore: JSON.stringify(restore),
            decompose: decompose
        });
    }
}
