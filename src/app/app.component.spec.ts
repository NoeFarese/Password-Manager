import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthSessionService } from './util/auth.session.service';

class MockAuthSessionService {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: AuthSessionService, useClass: MockAuthSessionService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
