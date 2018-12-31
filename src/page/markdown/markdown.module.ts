import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MarkdownPage } from './markdown.page';
import { PipesModule } from '../../pipe/pipes.module';

const routes: Routes = [
    {
        path: '',
        component: MarkdownPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PipesModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MarkdownPage]
})
export class MarkdownPageModule { }
