import {Component, OnInit, ViewChild} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ThemeService} from '../../core/services/theme';
import {FullscreenService} from '../../core/services/fullscreen';
import {SidebarComponent, ToolbarComponent} from 'src/app/core';
import {SidebarKind, Theme, ToolbarDisplay, ToolbarMode} from 'src/app/core/domains';

@Component({
    selector: 'app-test-layout',
    templateUrl: './test-layout.component.html',
    styleUrls: ['./test-layout.component.scss']
})
export class TestLayoutComponent implements OnInit {

    title = ' BGIS ';

    theme: Theme = Theme.BLUR_MINT;
    themeClass: string;

    fullscreen = null;

    mode = ToolbarMode;
    display = ToolbarDisplay;
    kind = SidebarKind;

    toolbarMode = ToolbarMode.OUTSIDE;
    toolbarFixed = true;
    sideNavFixed = true;

    displayOutToolbar: ToolbarDisplay = ToolbarDisplay.DEFAULT;
    fixedOutToolbar = false;

    @ViewChild('toolbarOutside') toolbarOutside?: ToolbarComponent = null;
    @ViewChild('sidebar') sidebar?: SidebarComponent = null;


    constructor(
        private themeService: ThemeService,
        private fullscreenService: FullscreenService,
        private overlayContainer: OverlayContainer,
    ) {
    }

    ngOnInit() {
        this.themeService.themeChanged.subscribe(theme => {
            this.themeService.updateTheme(this.overlayContainer);
            this.themeClass = this.themeService.getThemeFull();
            this.theme = theme;
        });
        this.theme = this.themeService.run(this.theme).getThemeShort();
        this.themeClass = this.themeService.getThemeFull();
        this.fullscreenService.fullscreenEmitter.subscribe(status => {
            this.fullscreen = status;
        });
        this.fullscreen = this.fullscreenService.isFullscreen();
    }


}
