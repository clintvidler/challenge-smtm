import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInfoComponent } from './report-info.component';

describe('ReportInfoComponent', () => {
  let component: ReportInfoComponent;
  let fixture: ComponentFixture<ReportInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportInfoComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test input props
  it('should display input values correctly', () => {
    fixture.componentRef.setInput('name', 'Name');
    fixture.componentRef.setInput('id', 'abc');
    // etc.

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Name');
    expect(compiled.querySelector('li strong')?.textContent).toContain('ID:');
    expect(compiled.querySelector('li')?.textContent).toContain('abc');
    // etc.
  });

  // test conditional rendering
  it('should conditionally render elements based on input values', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('No title');
    expect(compiled.querySelector('li')?.textContent).not.toContain('ID:');
    // etc.
  });

  // test computed props
  it('should compute properties correctly', () => {
    fixture.componentRef.setInput('created', '2024-01-01');
    // etc.

    fixture.detectChanges();

    expect(component.created()).toBe('01/01/2024');
    // etc.
  });
});
