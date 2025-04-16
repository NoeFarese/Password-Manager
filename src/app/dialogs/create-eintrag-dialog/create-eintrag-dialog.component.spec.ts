import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEintragDialogComponent } from './create-eintrag-dialog.component';

describe('CreateEintragDialogComponent', () => {
  let component: CreateEintragDialogComponent;
  let fixture: ComponentFixture<CreateEintragDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEintragDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEintragDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
