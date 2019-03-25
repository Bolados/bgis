import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./material.module";
import {LoaderComponent} from "./components/loader/loader.component";
import {library} from "@fortawesome/fontawesome-svg-core";

import {
    faAsterisk,
    faBars,
    faBook,
    faCaretDown,
    faCaretUp,
    faCheck,
    faCog,
    faEdit,
    faExclamationTriangle,
    faFilter,
    faLanguage,
    faLightbulb,
    faPaintBrush,
    faPlayCircle,
    faPlus,
    faPowerOff,
    faRocket,
    faSquare,
    faStream,
    faTasks,
    faTimes,
    faTrash,
    faUserCircle,
    faWindowMaximize
} from '@fortawesome/free-solid-svg-icons';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxMasonryModule} from "ngx-masonry";
import {ControlMessagesComponent} from "./components/control-messages/control-messages.component";

library.add(
    faAsterisk,
    faBars,
    faUserCircle,
    faPowerOff,
    faCog,
    faRocket,
    faPlayCircle,
    faPlus,
    faEdit,
    faTrash,
    faTimes,
    faCaretUp,
    faCaretDown,
    faExclamationTriangle,
    faFilter,
    faTasks,
    faCheck,
    faSquare,
    faLanguage,
    faPaintBrush,
    faLightbulb,
    faWindowMaximize,
    faStream,
    faBook
);

@NgModule({
    declarations: [
        ControlMessagesComponent,
        LoaderComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule,
        FontAwesomeModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        MaterialModule,

        NgbModule,
        FontAwesomeModule,
        NgxMasonryModule,

        ControlMessagesComponent,
        LoaderComponent
    ]
})
export class SharedModule {
}
