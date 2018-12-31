import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-book',
    templateUrl: './book.page.html',
    styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
    imgUrl: string = '../../assets/img/book';
    bookList: Array<any> = [
        {
            title: "来自开发者的信",
            author: "浅",
            avatar: "qian",
            content: `
##前言
            Hello 各位，这里是萌新一枚。新的一年马上就来了，首先祝大家元旦快乐，新的一年心想事成，学业有成哦。
            我趁着这几天放假，总算完成了产品的更新迭代，暂时命名为“AI小助手”。（所以并不是我鸽啊，实在是加班比较多）并且永久开源免费。
            ![](${this.imgUrl}/1/cat.png)

###原理
            主要分为两步：
            - ####分解句子结构
            这一部分由百度AI的依存句法接口完成。之后我将得到句子之间每个部分之间的依存关系，以及词性。由于传送回的是json格式，所以我做了一个可视化模块将其绘制出来，例如下面这样：
            ![](${this.imgUrl}/1/canvas.png)
            其中连线代表其与父元素的关系：例如SBV为主谓关系，ATT为定中关系，VOB为介宾关系等。
            - ####根据依存关系以及词性转化
            目前的算法大致如下：
            1. 判断技能类型
            2. 获取类型之后移交至相应的模块处理
            3. 相应的模块根据句子部分之间的依存关系以及词性开始遍历每一个可能出现的要素。例如视为技，需遍历合适的卡牌，卡牌区域，数量，卡牌限制条件等等。期间sentence.ts是核心服务，它将处理例如寻找合适的子元素，获取翻译，格式化等等一系列最基本的操作
            4. 获得结果后将结果发送给阅读页面生成一个临时页面，呈现给用户

###AI小助手的功能
            - ####技能描述转代码
            由于工期紧张，在迭代的过程中我并没有写新的算法。目前只支持一些简单的视为技，不过后面我会慢慢完善。
            - ####阅读
            也就是底部栏的“Book”。这里我会写一些不限于无名杀的简单知识，对前端感兴趣的朋友可以看看哦。当然也欢迎各位大佬前来投稿。只需要了解最简单的[Markdown语法](http://http://pandao.github.io/editor.md/examples/full.html)\n

###未来更新方向
            - ####算法
            中华汉字博大精深，尤其是无名杀的技能变化多样，所以想尽善尽美是不可能的，这也是我当初为什么给它定义为“专为萌新服务”。所以这一部分是难度最大也是软件的核心部分。我暂时不可能将它短期内写的很完美。
            - ####主题
            难度不大，应该很快就能完成。不过本人更倾向于有现成的东西去写。所以需要各位美工能提供一些设计稿或者素材，设计稿最好精确到px。
            - ####设置项
            同上，目前AI小助手还处于很初期的状态。很多基本功能都还没有，不过稍安勿躁。
            - ####语音输入
            百度AI有现成的接口，实现起来应该不难。可以解放双手。不过这个功能貌似有点鸡肋。
            - ####在线交互
            其实目前AI小助手只有在发送你的技能描述的时候才会联网，远程服务器将句子结构分解后，剩下的解析均是本地操作。所以它完全可以视为一款单机软件。这里的说在线交互就是一些登录注册，发布文章之类的。联网是否有必要我觉得有待考虑。
			`
        }
    ]
    constructor(
        public router: Router
    ) { }

    ngOnInit() {
    }
    moveTo(page, book) {
        this.router.navigate([page, {
            title: book.title,
            author: book.author,
            avatar: book.avatar,
            content: book.content
        }],{skipLocationChange:true})
    }

}
