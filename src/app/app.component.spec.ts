import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        }).compileComponents();
    
        fixture = TestBed.createComponent(AppComponent);
    }));
    it('should create the app', () => {
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
    it('should include router-outlet', () => {
        expect(fixture.nativeElement.querySelector('router-outlet')).toBeDefined();
    });
});
