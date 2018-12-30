import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: '../page/tabs/tabs.module#TabsPageModule' },
    { path: 'markdown', loadChildren: '../page/markdown/markdown.module#MarkdownPageModule' },
    { path: 'about', loadChildren: '../page/about/about.module#AboutPageModule' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
