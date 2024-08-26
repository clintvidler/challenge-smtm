import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRowsComponent } from './report-rows.component';

describe('ReportRowsComponent', () => {
  let component: ReportRowsComponent;
  let fixture: ComponentFixture<ReportRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportRowsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportRowsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('rows', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header row with correct number of cells', () => {
    const rows = [
      {
        RowType: 'Header',
        Cells: [{ Value: 'Header 1' }, { Value: 'Header 2' }],
      },
    ];
    fixture.componentRef.setInput('rows', rows);
    fixture.detectChanges();

    const headers = fixture.nativeElement.querySelectorAll('thead th');
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toContain('Header 1');
    expect(headers[1].textContent).toContain('Header 2');
  });

  it('should render nested rows with azure background for the last row', () => {
    const rows: any[] = [
      {
        RowType: 'Body',
        Rows: [
          { Cells: [{ Value: 'Cell 1' }, { Value: 'Cell 2' }] },
          { Cells: [{ Value: 'Cell 3' }, { Value: 'Cell 4' }] },
        ],
      },
    ];
    fixture.componentRef.setInput('rows', rows);
    fixture.detectChanges();

    const tbody = fixture.nativeElement.querySelector('tbody');
    expect(tbody).toBeTruthy(); // Ensure tbody is rendered

    const lastRow = tbody.querySelectorAll('tr')[1]; // Select the last row
    expect(lastRow).toBeTruthy(); // Ensure the last row exists

    const cells = lastRow.querySelectorAll('td');
    expect(cells.length).toBe(2); // Ensure the correct number of cells

    // Verify the background color of the last row
    cells.forEach((cell: any) => {
      expect(cell.style.background).toBe('azure');
    });
  });

  it('should render title row when no nested rows', () => {
    const rows = [{ RowType: 'Body', Title: 'Title Row', Rows: [] }];
    fixture.componentRef.setInput('rows', rows);
    fixture.detectChanges();

    const titleRow = fixture.nativeElement.querySelector('tbody tr th');
    expect(titleRow.textContent).toContain('Title Row');
    expect(titleRow.getAttribute('colspan')).toBe('3');
  });
});
