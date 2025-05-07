import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {FirebaseService} from '../util/firebase.service';
import {ActivatedRoute} from '@angular/router';
import {LoginComponent} from '../login/login.component';

class MockFirebaseService {}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent],
      providers: [
        { provide: FirebaseService, useClass: MockFirebaseService },
        { provide: ActivatedRoute, useClass: LoginComponent },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
