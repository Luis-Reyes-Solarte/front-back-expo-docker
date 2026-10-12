import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoV2 } from './to-do-v2';

describe('ToDoV2', () => {
  let component: ToDoV2;
  let fixture: ComponentFixture<ToDoV2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoV2],
    }).compileComponents();

    fixture = TestBed.createComponent(ToDoV2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
