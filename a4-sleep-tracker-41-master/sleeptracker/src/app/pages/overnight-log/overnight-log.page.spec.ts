import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OvernightLogPage } from './overnight-log.page';

describe('OvernightLogPage', () => {
  let component: OvernightLogPage;
  let fixture: ComponentFixture<OvernightLogPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OvernightLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
