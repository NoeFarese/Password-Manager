import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEintragDialogComponent } from './create-eintrag-dialog.component';
import {MatDialogRef} from '@angular/material/dialog';
import {FirebaseService} from '../../util/firebase.service';

class MockFirebaseService {}

describe('CreateEintragDialogComponent', () => {
  let component: CreateEintragDialogComponent;
  let fixture: ComponentFixture<CreateEintragDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEintragDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: FirebaseService, useClass: MockFirebaseService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEintragDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
