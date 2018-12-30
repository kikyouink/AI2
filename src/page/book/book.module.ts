import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookPage } from './book.page';
import { PipesModule } from '../../pipe/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: BookPage
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
  declarations: [BookPage]
})
export class BookPageModule {}
