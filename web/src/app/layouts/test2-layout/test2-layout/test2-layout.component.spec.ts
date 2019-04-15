import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Test2LayoutComponent} from './test2-layout.component';

describe('Test2LayoutComponent', () => {
    let component: Test2LayoutComponent;
    let fixture: ComponentFixture<Test2LayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Test2LayoutComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Test2LayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
