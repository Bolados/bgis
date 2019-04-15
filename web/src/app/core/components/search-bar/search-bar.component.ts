import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

    bigMenu: boolean;
    @Input() open;

    @Input() placeholder = 'Search';

    value: string;

    isFocused: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    search() {

    }

    onFocus() {
        this.bigMenu = true;
        this.isFocused = true;
    }

    onFocusOut() {
        this.bigMenu = false;
        this.isFocused = false;
    }

}
