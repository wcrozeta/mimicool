import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordDrawComponent } from './word-draw.component';

describe('WordDrawComponent', () => {
  let component: WordDrawComponent;
  let fixture: ComponentFixture<WordDrawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordDrawComponent]
    });
    fixture = TestBed.createComponent(WordDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
