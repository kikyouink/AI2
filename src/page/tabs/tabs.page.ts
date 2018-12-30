import { Component } from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    tabs: Array<any> = [
        {
            link: 'AI',
            icon: 'code',
            label: 'AI'
        }, {
            link: 'Book',
            icon: 'book',
            label: 'Book'
        }
    ]
}
