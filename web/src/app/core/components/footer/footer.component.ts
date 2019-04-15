import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../services/theme/theme.service';
import {Theme} from '../../domains';
import {ThemeTools} from '../../tools';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    selectedTheme: Theme;
    themes = ThemeTools;


    constructor(private themeService: ThemeService) {
    }

    ngOnInit() {
        this.themeService.themeChanged.subscribe(theme => {
            this.selectedTheme = this.themeService.getThemeShort();
        });
        this.selectedTheme = this.themeService.getThemeShort();
    }

    changeTheme(selectedTheme) {
        this.selectedTheme = this.themeService.run(selectedTheme).getThemeShort();
    }

}
