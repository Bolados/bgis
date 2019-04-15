import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {SidemenuService} from '../../services/sidemenu';

@Component({
    selector: 'app-sidemenu-item',
    templateUrl: './sidemenu-item.component.html',
    styleUrls: ['./sidemenu-item.component.scss']
})
export class SidemenuItemComponent implements OnInit, AfterViewInit {

    @ViewChildren('submenuitem') submenusComponents: QueryList<SidemenuItemComponent>;

    @Input() parent = null;
    @Input() menu;
    @Input() iconOnly: boolean;

    constructor(private el: ElementRef,
                private sidemenuService: SidemenuService,
    ) {
    }


    ngAfterViewInit() {
        // console.log(this.submenusComponents);
    }

    ngOnInit() {
    }

    openLink() {
    }

    getBoundary() {
        return this.el.nativeElement.getBoundingClientRect();
    }

    hoverMenuItem() {
        this.sidemenuService.hoverItem(this);
    }

    checkForChildMenu() {
        return (this.menu && this.menu.sub) ? true : false;
    }


}
