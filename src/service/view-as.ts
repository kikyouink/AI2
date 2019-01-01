import { Injectable } from '@angular/core';
import { SentenceService } from "../service/sentence";
import { RxjsService } from "../service/rxjs";
@Injectable({
    providedIn: 'root'
})
export class ViewAsService {

    list: any = {};
    promptList: any = {
        when: [],
        filterCard: [],
        selectCard: [],
        position: [],
        viewAs: []
    };
    constructor(
        public sentence: SentenceService,
        public rxjs: RxjsService
    ) { }

    getWhen() {
        var when;
        var HED = this.sentence.getHED();
        var when1 = this.sentence.getChildren(HED, "VV");
        var when2 = this.sentence.getSibling(when1);
        if (!when2) {
            when = this.sentence.getTranslation(when1);
            this.promptList.when.push(when1[0].word);
        } else {
            var arr = [];
            arr.push(this.sentence.getTranslation(when1));
            arr.push(this.sentence.getTranslation(when2));
            when = arr;
            this.promptList.when.push(when1[0].word, when2[0].word);
        }
        this.list.enable = when;
        console.table(this.promptList.when);
        return when;
    }
    getFilterCard() {
        var main = "", filter = [];
        var card = this.sentence.getFilter("", "BA", "n");
        var ATT = this.sentence.getATT(card);
        if (ATT)
            ATT.map(i => {
                var type = this.sentence.getType(i.word);
                if (type == "suit" || type == "color" || type == "type") {
                    this.promptList.filterCard.push(i.word);
                    var value = this.sentence.getTranslation(i);
                    filter.push({
                        type: type,
                        value: value
                    });
                }
            });
        var j = filter.length;
        while (j--) {
            var [type, value] = [filter[j].type, filter[j].value];
            main += `get.${type}(card)=="${value}"`;
            if (j) main += `&&`;
            else main += `;`;
        }
        if (main != "") {
            var filterCard = new Function("card", "player", `return ${main}`);
            this.list.filterCard = filterCard;
            console.table(this.promptList.filterCard);
            return filterCard;
        }
    }
    getSelectCard() {
        var num = this.sentence.getFilter("", "QUN");
        this.promptList.selectCard.push(num[0].word);
        if (!num || this.sentence.getTranslation(num) < 2) return;
        var num2 = this.sentence.getTranslation(num);
        this.list.selectCard = num2;
        console.table(this.promptList.selectCard);
        return num2;
    }
    getPosition() {
        var position;
        var card = this.sentence.getFilter("", "BA", "n");
        var ATT = this.sentence.getATT(card);
        if (ATT)
            ATT.map(i => {
                var type = this.sentence.getType(i.word);
                if (type == "position") {
                    this.promptList.position.push(i.word);
                    position = this.sentence.getTranslation(i);
                }
            });
        if (!position) position = "he";
        this.list.position = position;
        console.table(this.promptList.position);
        return position;
    }
    getViewAs() {
        var HED = this.sentence.getHED();
        var viewAs = this.sentence.getChildren(HED, "VOB")[0].word.replace(/【|】/g, "");
        this.promptList.viewAs.push(viewAs);
        viewAs = this.sentence.getTranslation(viewAs);
        var v = {
            name: viewAs
        };
        this.list.viewAs = v;
        console.table(this.promptList.viewAs);
        return v;
    }
    getPrompt() {
        var selectCard = this.promptList.selectCard ? this.promptList.selectCard : "一";
        var filterCard = this.promptList.filterCard.join("");
        var when = this.promptList.when.length < 2 ? this.promptList.when[0] : this.promptList.when[0] + "或" + this.promptList.when[1];
        var position = this.promptList.position.length ? this.promptList.position[0] : "";
        var viewAs = this.promptList.viewAs[0];
        var prompt = `将${selectCard}张${filterCard}${position}牌当做${viewAs}${when}`;
        this.list.prompt = prompt;
        return prompt;
    }
    clear() {
        this.list = {};
        for (var i in this.promptList) {
            this.promptList[i] = [];
        }
    }
    done() {
        var code = this.sentence.getConversion(this.list);
        var restore = this.sentence.getRestore(this.sentence.json);
        var content = "---javascript\n" + code + "\n---\n";
        this.rxjs.sendPage('/markdown', {
            type: 'code',
            title: "转换结果",
            author: "AI",
            avatar: "ai",
            content: content,
            source: code,
            restore: JSON.stringify(restore)
        });

    }
    //视为技
    start() {
        console.log("开始编写视为技");
        this.clear();
        this.getWhen();
        this.getFilterCard();
        this.getSelectCard();
        this.getPosition();
        this.getViewAs();
        this.getPrompt();
        this.done();
    }
}
