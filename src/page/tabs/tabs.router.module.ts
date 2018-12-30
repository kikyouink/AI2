import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'AI',
                children: [
                    {
                        path: '',
                        loadChildren: '../ai/ai.module#AiPageModule'
                    }
                ]
            },
            {
                path: 'Book',
                children: [
                    {
                        path: '',
                        loadChildren: '../book/book.module#BookPageModule'
                    }
                ]
            },
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/AI',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
