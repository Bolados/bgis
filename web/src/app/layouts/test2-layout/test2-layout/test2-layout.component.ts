import {OverlayContainer} from '@angular/cdk/overlay';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SidebarComponent, ToolbarComponent} from 'src/app/core';
import {SidebarKind, Theme, ToolbarDisplay, ToolbarMode} from 'src/app/core/domains';
import {FullscreenService} from '../../../core/services/fullscreen';
import {ThemeService} from '../../../core/services/theme';
import {MediaMatcher} from '@angular/cdk/layout';


@Component({
    selector: 'app-test2-layout',
    templateUrl: './test2-layout.component.html',
    styleUrls: ['./test2-layout.component.scss']
})
export class Test2LayoutComponent implements OnInit {

    mobileQuery: MediaQueryList;
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
    private _mobileQueryListener: () => void;

    constructor(
        private themeService: ThemeService,
        private fullscreenService: FullscreenService,
        private overlayContainer: OverlayContainer,
        private media: MediaMatcher,
        private changeDetectorRef: ChangeDetectorRef,
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

        this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }


}
