import { Injectable } from '@angular/core';
import { RxjsService } from "../service/rxjs";
import { log } from 'util';

@Injectable({
    providedIn: 'root'
})
export class SentenceService {

    json: any;
    restoreList = []
    typeList: object = {
        suit: ['club', 'diamond', 'heart', 'spade'],
        color: ['red', 'black'],
        type: ['basic', 'equip', 'trick'],
        position: ['h', 'e', 'he', 'j'],
    }
    replaceList: Array<any> = [
        {
            reg: '【[\u4e00-\u9fa5]+】',
            replacement: '扑克',
        }, {
            reg: '装备区|判定区',
            replacement: '区域',
        }, {
            reg: '红桃|黑桃|方块|梅花',
            replacement: '花色'
        }, {
            reg: '准备|判定|出牌|弃牌|结束',
            replacement: '特定'
        }
    ]
    translationList: object = {
        '一/一张/一名': 1,
        '两/二': 2,
        '三': 3,
        '四': 4,
        '五': 5,
        '六': 6,
        '七': 7,
        '准备': 'phaseBegin',
        '出牌': 'phaseUse',
        '判定': 'judge',
        '弃牌': 'discard',
        '结束': 'phaseEnd',
        '你/你可以': 'player',
        '其他': 'other',
        '角色': 'target',
        '摸': 'draw',
        '弃置': 'discard',
        '获得': 'gain',
        '回复': 'recover',
        '造成': 'damage',
        '使用': 'chooseToUse',
        '打出': 'chooseToRespond',
        '和/与': '&&',
        '非': '!',
        '红色': 'red',
        '黑色': 'black',
        '梅花/草花': 'club',
        '方块/方片': 'diamond',
        '红桃': 'heart',
        '黑桃': 'spade',
        '装备区': 'e',
        '判定区': 'j',
        '基本': 'basic',
        '锦囊': 'trick',
        '装备': 'equip',
        '杀': 'sha',
        '闪': 'shan',
        '桃': 'tao',
        '过河拆桥': 'guohe',
        '借刀杀人': 'jiedao',
        '决斗': 'juedou',
        '南蛮入侵': 'nanman',
        '顺手牵羊': 'shunshou',
        '桃园结义': 'taoyuan',
        '万箭齐发': 'wanjian',
        '五谷丰登': 'wugu',
        '无懈可击': 'wuxie',
        '无中生有': 'wuzhong',
        '闪电': 'shandian',
        '手': 'h',
    }
    constructor(
        public rxjs: RxjsService,
    ) {
        window.onerror = (message, url, line, column, error) => {
            console.log('[错误]:', message, url, line, column, error);
            this.rxjs.show(message);
        }
    }
    getType(word) {
        if (!word) return null;
        var w;
        if (/[\u4e00-\u9fa5]+/.test(word)) w = this.getTranslation(word);
        else w = word;
        for (var i in this.typeList) {
            if (this.typeList[i].includes(w)) return i;
        }
    }
    getTranslation(word, reverse = false) {
        if (!word) return null;
        if (word.constructor == Object) word = word.word || word.name;
        if (word.constructor == Array) word = word[0].word || word[0].name;
        if (!reverse) {
            for (var i in this.translationList) {
                if (i == word || (i.indexOf('/') != -1 && i.indexOf(word) != -1)) return this.translationList[i];
            }
        } else {
            for (var i in this.translationList) {
                var ti = this.translationList[i];
                if (ti == word || i.indexOf('/') != -1 && i.indexOf(word) != -1) {
                    return i.split('/')[0];
                }
            }
        }
        console.error(`没有找到【${word}】的翻译...`);
        return word;
    }
    getConversion(obj) {
        var str = '';
        function track(obj) {
            for (var i in obj) {
                str += `${i}:`;
                if (typeof obj[i] == "function") {
                    str += `${obj[i].toString()},`;
                    str = str.replace(/^"|"$|anonymous|[\r]|\/\*\S+\*\//g, '').replace(/\n\)/g, ')');
                }
                else if (obj[i].constructor === Array) {
                    var arr = "";
                    obj[i].map((j) => {
                        arr += `"${j}",`;
                    })
                    arr = arr.substr(0, arr.length - 1);
                    str += `[${arr}],`;
                } else if (obj[i].constructor === Object) {
                    str += '{';
                    track(obj[i]);
                    str += '},'
                } else if (typeof obj[i] == "number") {
                    str += `${obj[i]},`;
                }
                else {
                    str += `"${obj[i]}",`;
                }
            }
        }
        track(obj);
        // str += '';
        console.log(str);

        var format = this.getFormat(str);
        return format;
    }
    getFormat(str) {
        var num = 0;
        function space(n) {
            var s = '';
            while (n--) {
                s += '	';
            }
            return s;
        }
        str = str.replace(/\{/g, '{\n')//左花括号
            .replace(/\,}/g, ',\n}')//右花括号
            .replace(/,(\b|$)/g, ',\n')//逗号到单词边界或者句子结尾
            .replace(/;/g, ';\n')//分号
            .replace(/\([^\)]+,[^\)]+\)/g, function (word) {
                return word.replace(/,\n/g, ',');//这个我自己都没看懂，鬼知道当时怎么写出来的
            })
        var arr = str.match(/(.+\n){1}/g);
        var n = '';
        arr.map((i, index, a) => {
            var length = i.length;
            if (i.substr(length - 2, 1) == "{") {
                num++;
            }
            else if (index < a.length - 1 && a[index + 1].indexOf('}') != -1) {
                num--;
            }
            n += i + `${space(num)}`;
        })
        return n;
    }
    getReplace(msg) {
        this.restoreList = [];
        var newMsg = msg;
        this.replaceList.map((i) => {
            var before = newMsg.match(new RegExp(i.reg, 'g'));
            if (before) {
                this.restoreList.push({
                    before: before[0],
                    after: i.replacement,
                })
            }
            newMsg = newMsg.replace(new RegExp(i.reg, 'g'), i.replacement);
        })
        console.log(this.restoreList);
        return newMsg;
    }
    getRestore(arr) {
        arr.map((i) => {
            this.restoreList.map((j) => {
                i.word = i.word.replace(new RegExp(j.after, 'g'), j.before);
            })
        })
        this.json = arr;
        return arr;
    }

    // --------------------------------------------句子成分------------------------------------------------

    //判断类型
    getHED() {
        var HED = this.json.filter((i) => {
            return i.head == 0
        })
        return HED;
    }
    getParent(item) {
        if (!item) return null;
        if (item.constructor == Array) item = item[0];
        var parent = this.json.filter((i) => {
            return i.id == item.head;
        })
        return parent;
    }
    getChildren(item, deprel?, postag?) {
        if (!item) return null;
        if (item.constructor == Array) item = item[0];
        var children = this.json.filter((i) => {
            if (i.head != item.id) return false;
            // var parent
            if (deprel && i.deprel.indexOf(deprel) == -1) return false;
            if (postag) {
                if (postag.indexOf('/') != -1) {
                    var bool = false;
                    var p = postag.split('/');
                    p.map((j) => {
                        if (i.postag.indexOf(j) != -1) bool = true;
                    })
                    return bool;
                }
                return postag && i.postag.indexOf(postag) != -1;
            }
            return true;
        })
        return children.length ? children : null;
    }
    getSibling(item) {
        if (!item) return null;
        if (item.constructor == Array) item = item[0];
        var sibling = this.getChildren(item);
        if (sibling) sibling = sibling.filter((i) => {
            return i.deprel == 'COO';
        })
        return sibling && sibling.length ? sibling : null;
    }
    getTrack(p, array) {
        var parent = [];
        if (p == null) parent = [];
        else if (p.constructor === Object) parent.push(p);
        else parent = this.deepCopy(p);
        parent.map((i) => {
            var children = this.getChildren(i, 'ATT', 'n');
            if (children) {
                array.push(i);
                this.getTrack(children, array);
            }
            else {
                array.push(i);
            }
        })
    }
    getATT(item, postag = 'n') {
        if (!item) return null;
        var arr = [];
        var DE = this.getChildren(item, 'DE');
        var SET = this.getChildren(DE, 'DE');
        var children = this.getChildren(item, 'ATT', postag);
        this.getTrack(children, arr);
        if (SET) this.getTrack(SET, arr);
        return arr.length ? arr : null;
    }
    getFilter(array, deprel, postag = "") {
        if (array == null || array == undefined) return null;
        if (array == '') array = this.json;
        var filter = array.filter((i) => {
            var bool = false;
            if (i.deprel.indexOf(deprel) == -1) return false;
            if (postag != "") {
                if (postag.indexOf('/') != -1) {
                    var p = postag.split('/');
                    p.map((j) => {
                        if (i.postag.indexOf(j) != -1) bool = true;
                    })
                    return bool;
                }
                return i.postag.indexOf(postag) != -1;
            }
            return true;
        })
        return filter.length ? filter : null;
    }
    deepCopy(source, bool = true) {
        var sourceCopy;
        if (bool) sourceCopy = [];
        else sourceCopy = {};
        for (var item in source) {
            sourceCopy[item] = typeof source[item] === 'object' ? this.deepCopy(source[item], false) : source[item];
        }
        return sourceCopy;
    }
}
