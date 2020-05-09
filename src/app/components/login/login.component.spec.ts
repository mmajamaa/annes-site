import { async, ComponentFixture, TestBed, inject, fakeAsync, flush, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { AdminComponent } from '../admin/admin.component';
import { AuthenticationService } from '../../services/authentication.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([{ path: 'auth/admin', component: AdminComponent }]), FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    beforeEach(inject([Router], (_router: Router) => {
        router = _router;
    }))

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should login the user and redirect to admin page', () => {
        let authenticationService = fixture.debugElement.injector.get(AuthenticationService);
        let spy = spyOn(authenticationService, 'login').and.returnValue(of({ username: 'testuser', token: 'test123' }));
        let navigateSpy = spyOn(router, 'navigate')

        const loginForm = new FormGroup({
            'username': new FormControl('testuser'),
            'password': new FormControl('test123')
        });

        component.loginUser(loginForm)
        fixture.detectChanges();

        expect(navigateSpy).toHaveBeenCalledWith(['/auth/admin']);
    })

});