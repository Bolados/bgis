import {SidebarKind, ToolbarMode} from '../enums';
import {SidebarComponent} from '../../components';
import {Toolbars} from './toolbar.models';
import {SidebarTools} from '../../tools';


export class SidebarConfig {

    mode: string;
    opened: SidebarKind;
    toolbars: Toolbars;
    fixed: boolean;
    fullscreen: boolean;

    constructor(mode: string = 'side',
                toolbars: Toolbars = new Toolbars(),
                fixed: boolean = true,
                opened: SidebarKind = SidebarKind.UNDEFINED,
                fullscreen: boolean = null
    ) {
        this.toolbars = toolbars;
        this.fixed = fixed;
        this.opened = opened;
        this.mode = mode;
        this.fullscreen = fullscreen;
    }

    isOpen(kind: SidebarKind) {
        return SidebarTools.isSame(this.opened, kind);
    }

    shownToolbar() {
        return (SidebarTools.isSame(this.toolbars.kind, ToolbarMode.INSIDE));
    }

}

export class Sidebar {

    kind: SidebarKind;
    component: SidebarComponent;
    config: SidebarConfig;

    constructor(kind: SidebarKind = SidebarKind.UNDEFINED,
                component: SidebarComponent = null,
                config: SidebarConfig = new SidebarConfig()) {
        this.kind = kind;
        this.component = component;
        this.config = config;
    }


}
