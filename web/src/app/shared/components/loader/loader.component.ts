import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

    @Input() public isLoading = false;
    @Input() public message: string;

    constructor() {
    }

    ngOnInit() {
    }

}
