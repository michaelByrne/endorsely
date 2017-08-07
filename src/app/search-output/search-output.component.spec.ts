import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOutputComponent } from './search-output.component';

describe('SearchOutputComponent', () => {
  let component: SearchOutputComponent;
  let fixture: ComponentFixture<SearchOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
