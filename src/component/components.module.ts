import { NgModule } from '@angular/core';
import { UserComponent } from './user/user';
import { PipesModule } from '../pipe/pipes.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
	declarations: [UserComponent],
    imports: [CommonModule,IonicModule,PipesModule],
	exports: [UserComponent]
})
export class ComponentsModule {}
