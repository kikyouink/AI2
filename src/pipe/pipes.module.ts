import { NgModule } from '@angular/core';
import { MarkdownPipe } from './markdown/markdown';
import { UrlPipe } from './url/url';
@NgModule({
	declarations: [MarkdownPipe,
    UrlPipe],
	imports: [],
	exports: [MarkdownPipe,
    UrlPipe]
})
export class PipesModule {}
