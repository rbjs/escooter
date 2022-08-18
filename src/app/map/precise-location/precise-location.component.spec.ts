import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IosLocationComponent } from './precise-location.component';

describe('IosLocationComponent', () => {
  let component: IosLocationComponent;
  let fixture: ComponentFixture<IosLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IosLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IosLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
