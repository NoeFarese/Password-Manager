import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEintragDialogComponent } from './delete-eintrag-dialog.component';

describe('DeleteEintragDialogComponent', () => {
  let component: DeleteEintragDialogComponent;
  let fixture: ComponentFixture<DeleteEintragDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteEintragDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEintragDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
