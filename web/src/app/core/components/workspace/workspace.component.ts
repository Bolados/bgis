import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BreadcrumbService} from 'angular-crumbs';

@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit, AfterViewInit {

    @Input() title = this.titleService.getTitle();
    private lastExcecution = new Date();

    constructor(
        private titleService: Title,
        private changeDetectorRef: ChangeDetectorRef,
        private breadcrumbService: BreadcrumbService,
    ) {
    }

    initialize() {

    }

    ngOnInit() {
        this.initialize()
        this.breadcrumbService.breadcrumbChanged.subscribe((crumbs) => {
            // this.titleService.setTitle(this.currentPage(crumbs));
        });
    }

    ngAfterViewInit(): void {
    }

    // private currentPage(routesCollection: Breadcrumb[]){
    //     const title = 'BGIS Web';
    //     const titles = routesCollection.filter((route) => route.terminal == true);

    //     if (!titles.length) { return title; }

    //     const routeTitle = titles.reduce((prev, curr) => {
    //         return `${curr.displayName}`;
    //     }, '');
    //     return `${routeTitle} `;
    // }

    // private createTitle(routesCollection: Breadcrumb[]) {
    //     const title = 'Breadcrumb';
    //     const titles = routesCollection.filter((route) => route.displayName);

    //     if (!titles.length) { return title; }

    //     const routeTitle = this.titlesToString(titles);
    //     return `${routeTitle} ${title} `;
    // }

    // private titlesToString(titles) {
    //     return titles.reduce((prev, curr) => {
    //         return `${curr.displayName} - ${prev}`;
    //     }, '');
    // }

}
