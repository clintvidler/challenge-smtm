import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ReportComponent, Report } from './report.component';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  const mockReport: Report = {
    ReportID: '123',
    ReportName: 'Test Report',
    ReportType: 'Summary',
    ReportTitles: ['Title1', 'Title2'],
    ReportDate: '2024-08-24',
    UpdatedDateUTC: '2024-08-24T12:00:00Z',
    Fields: [],
    Rows: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('report', mockReport);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty message when report rows are absent', () => {
    fixture.componentRef.setInput('report', { ...mockReport });

    fixture.detectChanges();

    const emptyMessage = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(emptyMessage.textContent).toContain('The report is empty...');
  });

  it('should correctly bind report ID to the div', () => {
    fixture.componentRef.setInput('report', mockReport);

    fixture.detectChanges();

    const divElement = fixture.debugElement.query(By.css('div')).nativeElement;
    expect(divElement.id).toBe('report-123');
  });

  it('should correctly compute reportName', () => {
    expect(component.reportName()).toBe('Test Report');
  });

  it('should correctly compute reportType', () => {
    expect(component.reportType()).toBe('Summary');
  });
});
