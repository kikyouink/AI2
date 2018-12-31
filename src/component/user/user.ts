import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'my-user',
    templateUrl: './user.html',
    styleUrls: ['./user.scss']
})
export class UserComponent implements OnInit {
    @Input() blur: boolean;
    @Input() bg: string;
    @Input() avatar: string;
    @Input() name: string;
    @Input() sign: boolean;
    constructor() { }

    ngOnInit() {
    }

}
