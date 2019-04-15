import {AfterViewChecked, ChangeDetectorRef, Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {PerfectScrollbarComponent} from 'ngx-perfect-scrollbar';
import {FullscreenService} from '../../services/fullscreen';
import {SidebarService} from '../../services/sidebar';
import {ToolbarService, ToolbarState} from '../../services/toolbar';
import {GoTopButtonComponent} from '../go-top-button/go-top-button.component';
import {SidemenuComponent} from '../sidemenu/sidemenu.component';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {
    Search,
    SidebarConfig,
    SidebarKind,
    Toolbar,
    ToolbarConfig,
    ToolbarDisplay,
    ToolbarMode,
    Toolbars
} from '../../domains';
import {SidebarTools} from '../../tools';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewChecked {

    @Input() config: SidebarConfig = null;
    // view
    toolbarModes = ToolbarMode;
    display = ToolbarDisplay;
    kind = SidebarKind;
    private lastExcecution = new Date();
    @ViewChild('contentScroller') private scroller?: PerfectScrollbarComponent = null;
    @ViewChild(GoTopButtonComponent) private goTopBtn?: GoTopButtonComponent = null;
    @ViewChild('toolbarOutside') private toolbarOutside?: ToolbarComponent = null;
    @ViewChild('toolbarInSidebar') private toolbarInSidebar?: ToolbarComponent = null;
    @ViewChild('toolbarInDrawer') private toolbarInDrawer?: ToolbarComponent = null;
    @ViewChild('toolbarInSidebarContent') private toolbarInSidebarContent?: ToolbarComponent = null;
    @ViewChild('navbar') private navbar?: SidemenuComponent = null;
    @ViewChild('navbarIcons') private navbarIcons?: SidemenuComponent = null;
    @Input() private fullscreen: boolean = null;
    @Input() private toolbar: ToolbarComponent = null;
    @Input() private toolbarMode: ToolbarMode = null;
    @Input() private toolbarFixed = null; // true;
    @Input() private opened = null; // SidebarKind.SIDE_NAV;
    @Input() private fixed = true;
    @Input() private mode = 'side';

    constructor(
        private media: MediaObserver,
        private fullscreenService: FullscreenService,
        private sidebarService: SidebarService,
        private toolbarService: ToolbarService,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    getNavbarBoundary() {
        if (this.config.isOpen(this.kind.SIDENAV)) {
            return this.navbar.getBoundary();
        }
        if (this.config.isOpen(this.kind.DRAWER)) {
            return this.navbarIcons.getBoundary();
        }
        return null;
    }

    checkToolbarState() {
        const toolbar = this.config.toolbars.getToolbar(this.config.toolbars.kind, ToolbarDisplay.ANY);
        if (SidebarTools.have(toolbar) && SidebarTools.have(toolbar.component)) {
            const boundary = toolbar.component.getBoundary();
            if (SidebarTools.have(boundary)) {
                const height = boundary.height;
                if (this.goTopBtn.getCurrentScrollTop() > (height / 2)) {
                    this.toolbarService.toggleToolbarState(ToolbarState.SCROLLED);
                    return;
                }

            }
        }
        this.toolbarService.toggleToolbarState(null);
    }

    isSidebarStateNoFixedOutsideToolbar() {
        const toolbar = this.config.toolbars.getToolbar(ToolbarMode.OUTSIDE, ToolbarDisplay.DEFAULT);
        return (SidebarTools.have(toolbar) && SidebarTools.have(toolbar.component)
            && !toolbar.config.fixed && !this.config.fullscreen);
    }

    @HostListener('window:scroll')
    onWindowScroll(event) {
        this.checkToolbarState();
    }

    onPsReachStart(event) {
        this.forceUpdate();
    }

    onPsScroll(event) {
        this.checkToolbarState();
        this.forceUpdate();
    }


    ngOnInit() {
        this.validateInputs();
        this.initialize();
        this.toggleView();
        this.initSidebarServices();
    }

    ngAfterViewChecked(): void {
        this.lastExcecution = new Date();
        this.insideToolbarUpdateAfterView();
        this.forceUpdate();
    }

    toggleView() {
        if (this.media.isActive('gt-md')) {
            this.config.mode = 'side';
            this.config.opened = SidebarKind.SIDENAV;
        } else if (this.media.isActive('gt-xs')) {
            this.config.mode = 'side';
            this.config.opened = SidebarKind.DRAWER;
        } else if (this.media.isActive('lt-sm')) {
            this.config.mode = 'over';
            this.config.opened = SidebarKind.UNDEFINED;
        }
    }


    initSidebarServices() {
        this.sidebarService.sidebarKindEmitter.subscribe(kind => {
            this.config.opened = kind;
            this.forceUpdate();
        });
        this.sidebarService.sidebarModeEmitter.subscribe(mode => {
            this.config.mode = mode;
            this.forceUpdate();
        });

        this.fullscreenService.fullscreenEmitter.subscribe(status => {
            this.config.fullscreen = status;
        });
        this.config.fullscreen = this.fullscreenService.isFullscreen();
    }


    customSidebarStyle(kind: ToolbarMode, display: ToolbarDisplay) {
        let vtop = null;
        let style = {};
        const toolbar = this.config.toolbars.getToolbar(kind, display);
        if (SidebarTools.have(toolbar) && SidebarTools.have(toolbar.component)
            && (toolbar.config.fixed || this.config.fullscreen)
        ) {
            const boundary = toolbar.component.getBoundary();
            if (SidebarTools.have(boundary)) {
                const boundaryHeight = boundary.height;
                if (SidebarTools.have(boundaryHeight)) {
                    vtop = boundaryHeight + 'px';
                }
            }
            style = {
                top: vtop
            };
        }

        return style;

    }

    customSidebarContentStyle(kindToolbar: ToolbarMode, display: ToolbarDisplay) {
        let vPaddingTop = null;
        let vPaddingLeft = null;
        let style = {};
        const toolbar = this.config.toolbars.getToolbar(kindToolbar, display);
        if (this.config.shownToolbar() && SidebarTools.have(toolbar)
            && SidebarTools.have(toolbar.component)
            && toolbar.config.fixed) {
            const boundary = toolbar.component.getBoundary();
            if (SidebarTools.have(boundary)) {
                const boundaryHeight = boundary.height;
                if (SidebarTools.have(boundaryHeight)) {
                    vPaddingTop = boundaryHeight + 'px';
                }

            }
        }

        const navBarBoundary = this.getNavbarBoundary();
        if (SidebarTools.have(navBarBoundary)) {
            vPaddingLeft = navBarBoundary.width + 'px';
        }

        style = {
            'padding-top': vPaddingTop,
            'padding-left': vPaddingLeft,
        };

        return style;

    }

    customSideMenuStyle(kindToolbar: ToolbarMode, display: ToolbarDisplay) {
        let vtop = null;
        let vheight = null;
        let style = {};
        const toolbar = this.config.toolbars.getToolbar(kindToolbar, display);
        if (this.config.shownToolbar() && SidebarTools.have(toolbar)
            && SidebarTools.have(toolbar.component)
            && toolbar.config.fixed) {
            const boundary = toolbar.component.getBoundary();
            if (SidebarTools.have(boundary)) {
                const boundaryHeight = boundary.height;
                if (SidebarTools.have(boundaryHeight)) {
                    vtop = boundaryHeight + 'px';
                    vheight = 'calc(100% - ' + boundaryHeight + 'px)';
                }

            }

            style = {
                top: vtop,
                height: vheight,
                'max-height': vheight,
            };
        }

        return style;

    }

    forceUpdate() {
        this.changeDetectorRef.detectChanges();
    }

    private initialize() {
        let toolbars = null;
        let toolbarOutside = new Toolbar();
        let toolbarCompo = null;
        let toolbarConf = null;
        if (!SidebarTools.have(this.config)) {
            const opened = this.opened;
            const fixed = this.fixed;
            const mode = this.mode;


            if (SidebarTools.have(this.toolbar)) {
                toolbarOutside = new Toolbar(this.toolbar, this.toolbar.config);
            }

            toolbarCompo = this.toolbarInSidebar;
            toolbarConf = new ToolbarConfig(ToolbarDisplay.SIDEBAR,
                this.fixed, opened, new Search(false), this.fullscreen);
            const toolbarInSidebar = new Toolbar(toolbarCompo, toolbarConf);

            toolbarCompo = this.toolbarInDrawer;
            toolbarConf = new ToolbarConfig(ToolbarDisplay.DRAWER,
                this.fixed, opened, new Search(false), this.fullscreen);
            const toolbarInDrawer = new Toolbar(toolbarCompo, toolbarConf);

            toolbarCompo = this.toolbarInSidebarContent;
            toolbarConf = new ToolbarConfig(ToolbarDisplay.SIDECONTENT,
                this.toolbarFixed, opened, new Search(false), this.fullscreen);
            const toolbarInSidebarContent = new Toolbar(toolbarCompo, toolbarConf);

            toolbars = new Toolbars(this.toolbarMode, this.toolbarFixed,
                new Array<Toolbar>(toolbarOutside
                    , toolbarInSidebar, toolbarInDrawer, toolbarInSidebarContent));
            this.config = new SidebarConfig(mode, toolbars, fixed, opened, this.fullscreen);
        }
    }

    private initConfig() {
        let toolbars = null;
        let toolbarOutside = new Toolbar();
        let toolbarCompo = null;
        let toolbarConf = null;
        if (SidebarTools.have(this.config)) {
            if (SidebarTools.isSame(this.config.toolbars.kind, ToolbarMode.OUTSIDE)
                && this.config.toolbars.haveToolbar(this.config.toolbars.kind, ToolbarDisplay.DEFAULT)) {
                toolbarOutside = this.config.toolbars.getToolbar(this.config.toolbars.kind, ToolbarDisplay.DEFAULT);
                this.config.toolbars.fixed = toolbarOutside.config.fixed;
            }

            if (SidebarTools.isSame(this.config.toolbars.kind, ToolbarMode.INSIDE)) {
                toolbarCompo = this.toolbarInSidebar;
                toolbarConf = new ToolbarConfig(ToolbarDisplay.SIDEBAR,
                    this.config.fixed, this.config.opened, new Search(false), this.config.fullscreen);
                const toolbarInSidebar = new Toolbar(toolbarCompo, toolbarConf);

                toolbarCompo = this.toolbarInDrawer;
                toolbarConf = new ToolbarConfig(ToolbarDisplay.DRAWER,
                    this.config.fixed, this.config.opened, new Search(false), this.config.fullscreen);
                const toolbarInDrawer = new Toolbar(toolbarCompo, toolbarConf);

                toolbarCompo = this.toolbarInSidebarContent;
                toolbarConf = new ToolbarConfig(ToolbarDisplay.SIDECONTENT,
                    this.config.toolbars.fixed, this.config.opened, new Search(false), this.config.fullscreen);
                const toolbarInSidebarContent = new Toolbar(toolbarCompo, toolbarConf);

                toolbars = new Toolbars(this.config.toolbars.kind, this.config.toolbars.fixed,
                    new Array<Toolbar>(toolbarOutside, toolbarInSidebar,
                        toolbarInDrawer, toolbarInSidebarContent));

                this.config.toolbars = toolbars;
            }
        }


    }

    private insideToolbarUpdateAfterView() {
        this.initConfig();
        this.config.toolbars.setToolbar(this.config.toolbars.kind, ToolbarDisplay.SIDEBAR, this.toolbarInSidebar);
        this.config.toolbars.setToolbar(this.config.toolbars.kind, ToolbarDisplay.DRAWER, this.toolbarInDrawer);
        this.config.toolbars.setToolbar(this.config.toolbars.kind, ToolbarDisplay.SIDECONTENT, this.toolbarInSidebarContent);
        // console.log(this.config);
    }

    private validateInputConfig() {
        const errorMessagePrefix = 'Sidebar component input validation error: ';
        const errorNoConfigPrefix = 'Configuration Error: ';

        if (SidebarTools.have(this.config)) {

            if (!SidebarTools.have(this.config.opened)) {
                throw Error(errorMessagePrefix
                    + errorNoConfigPrefix
                    + '\'opened\' parameter must be defined');
            }
            if (!SidebarTools.have(this.config.mode)) {
                throw Error(errorMessagePrefix
                    + errorNoConfigPrefix
                    + '\'mode\' parameter must be defined');
            }
            if (!this.config.fixed) {
                throw Error(errorMessagePrefix + '\'sideNav fixed\' parameter must be true. ');
            }

            if (!SidebarTools.have(this.config.toolbars)) {
                throw Error(errorMessagePrefix
                    + errorNoConfigPrefix
                    + '\'toolbars\' parameter must be defined');
            }

            if (!SidebarTools.have(this.config.toolbars.kind)) {
                throw Error(errorMessagePrefix
                    + errorNoConfigPrefix
                    + '\'toolbars kind\' parameter must be defined');
            }
            if (SidebarTools.isSame(this.config.toolbars.kind, ToolbarMode.OUTSIDE)) {
                if (!this.config.toolbars.haveToolbar(this.config.toolbars.kind, ToolbarDisplay.DEFAULT)) {
                    throw Error(errorMessagePrefix
                        + errorNoConfigPrefix
                        + '\'toolbars outsidetoolbar\' parameter must be defined');
                }
            }
            if (SidebarTools.isSame(this.config.toolbars.kind, ToolbarMode.INSIDE)) {
                if (!SidebarTools.have(this.config.toolbars.fixed)) {
                    throw Error(errorMessagePrefix
                        + errorNoConfigPrefix
                        + '\'toolbars fixed\' parameter must be defined');
                }
            }


        }
    }

    private validateInputs() {

        const errorMessagePrefix = 'Sidebar component input validation error: ';
        const errorNoConfigPrefix = 'Configuration Error: ';
        if (!SidebarTools.have(this.config)) {
            if (!SidebarTools.have(this.toolbarMode)) {
                throw Error(errorMessagePrefix
                    + errorNoConfigPrefix
                    + '\'toolbarMode\' parameter must be defined');
            }
            if (SidebarTools.isSame(this.toolbarMode, ToolbarMode.OUTSIDE)) {
                if (!SidebarTools.have(this.toolbar)) {
                    throw Error(errorMessagePrefix
                        + errorNoConfigPrefix
                        + '\'toolbar\' parameter must be defined');
                }
            }
            if (SidebarTools.isSame(this.toolbarMode, ToolbarMode.INSIDE)) {
                if (SidebarTools.have(this.toolbar)) {
                    throw Error(errorMessagePrefix + errorNoConfigPrefix
                        + '\'toolbar\' parameter must be removed');
                }
                if (!SidebarTools.have(this.toolbarFixed)) {
                    throw Error(errorMessagePrefix
                        + errorNoConfigPrefix
                        + '\'toolbarFixed\' parameter must be defined');
                }
            }

            if (!SidebarTools.have(this.opened)) {
                throw Error(errorMessagePrefix
                    + errorNoConfigPrefix
                    + '\'opened\' parameter must be defined');
            }
            if (!SidebarTools.have(this.mode)) {
                throw Error(errorMessagePrefix
                    + errorNoConfigPrefix
                    + '\'mode\' parameter must be defined');
            }
            if (!this.fixed) {
                throw Error(errorMessagePrefix + '\'sideNav fixed\' parameter must be true. ');
            }
        } else {
            if (SidebarTools.have(this.toolbar)) {
                throw Error(errorMessagePrefix + errorNoConfigPrefix
                    + '\'toolbar\' parameter must be removed');
            }
            if (SidebarTools.have(this.toolbarMode)) {
                throw Error(errorMessagePrefix + errorNoConfigPrefix
                    + '\'toolbarMode\' parameter must be removed');
            }
            if (SidebarTools.have(this.toolbarFixed)) {
                throw Error(errorMessagePrefix
                    + errorNoConfigPrefix
                    + '\'toolbarFixed\' parameter must be removed');
            }
            if (SidebarTools.have(this.opened)) {
                throw Error(errorMessagePrefix
                    + errorNoConfigPrefix
                    + '\'opened\' parameter must be removed');
            }
            // if ( SidebarTools.have(this.mode ) ) {
            //     throw Error(errorMessagePrefix
            //         + errorNoConfigPrefix
            //         + '\'mode\' parameter must be removed');
            // }

            this.validateInputConfig();


        }
    }

}
