import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

export interface Cell {
  Value: string;
  Attributes?: { Value: string; Id: string }[];
}

export interface Row {
  RowType: string;
  Title?: string;
  Cells?: Cell[];
  Rows?: Row[];
}

@Component({
  selector: 'app-report-rows',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-rows.component.html',
  styleUrl: './report-rows.component.scss',
})
export class ReportRowsComponent {
  rowsInput = input.required<Row[]>({ alias: 'rows' });

  rows = computed(() => this.rowsInput());
}
