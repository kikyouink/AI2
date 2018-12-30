import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
	/**
	 * Takes a value and makes it lowercase.
	 */
	transform(value: string, ...args) {
		return value.replace(/[^\u4e00-\u9fa5]+/g,' ').substr(0,40);
	}
}
