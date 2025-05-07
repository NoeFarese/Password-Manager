import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEintragDialogComponent } from './edit-eintrag-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FirebaseService} from '../../util/firebase.service';

class MockFirebaseService {}

describe('EditEintragDialogComponent', () => {
  let component: EditEintragDialogComponent;
  let fixture: ComponentFixture<EditEintragDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEintragDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: FirebaseService, useClass: MockFirebaseService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEintragDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
