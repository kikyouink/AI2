import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'url',
})
export class UrlPipe implements PipeTransform {

    transform(value: string, type: string) {
        if(type!='bg'){
            return `/assets/img/${type}/${value}.png`;
        }
        else return `url('/assets/img/bg/${value}.png')`;
    }
}
