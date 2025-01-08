import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorGuideComponent } from './editor-guide.component';

describe('EditorGuideComponent', () => {
  let component: EditorGuideComponent;
  let fixture: ComponentFixture<EditorGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
