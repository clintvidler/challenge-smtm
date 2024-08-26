import { Component, computed, effect, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportInfoComponent } from './report-info/report-info.component';
import { ReportRowsComponent, Row } from './report-rows/report-rows.component';

export interface Report {
  ReportID: string;
  ReportName: string;
  ReportType: string;
  ReportTitles: string[];
  ReportDate: string;
  UpdatedDateUTC: string;
  Fields: any[];
  Rows: Row[];
}

interface State {
  report: Report;
}

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, ReportInfoComponent, ReportRowsComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  // (immutable) inputs from parent component
  reportInput = input.required<Report>({ alias: 'report' });

  // (mutable) internal state props
  private reportState = signal<Report>({} as Report);

  // computed state
  private state = computed<State>(() => ({
    report: this.reportState(),
  }));

  // state selectors
  reportID = computed(() => this.state().report.ReportID);
  reportName = computed(() => this.state().report.ReportName);
  reportType = computed(() => this.state().report.ReportType);
  reportTitles = computed(() => this.state().report.ReportTitles);
  reportCreated = computed(() => this.state().report.ReportDate);
  reportUpdated = computed(() => this.state().report.UpdatedDateUTC);
  reportFields = computed(() => this.state().report.Fields);
  reportRows = computed(() => this.state().report.Rows);

  constructor() {
    // watch the inputs to update internal state
    effect(
      () => {
        this.reportState.set(this.reportInput());
      },
      { allowSignalWrites: true }
    );
  }
}
