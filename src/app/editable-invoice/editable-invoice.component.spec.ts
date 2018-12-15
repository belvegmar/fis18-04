import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableInvoiceComponent } from './editable-invoice.component';

describe('EditableInvoiceComponent', () => {
  let component: EditableInvoiceComponent;
  let fixture: ComponentFixture<EditableInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
