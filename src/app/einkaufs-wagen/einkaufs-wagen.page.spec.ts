import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EinkaufsWagenPage } from './einkaufs-wagen.page';

describe('EinkaufsWagenPage', () => {
  let component: EinkaufsWagenPage;
  let fixture: ComponentFixture<EinkaufsWagenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EinkaufsWagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
