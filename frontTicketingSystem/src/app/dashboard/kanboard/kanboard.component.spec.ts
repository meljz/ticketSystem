import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanboardComponent } from './kanboard.component';

describe('KanboardComponent', () => {
  let component: KanboardComponent;
  let fixture: ComponentFixture<KanboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
