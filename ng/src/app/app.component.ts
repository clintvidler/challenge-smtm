import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { BalanceSheetService } from './data-access/balance-sheet.service';
import { ReportComponent } from './reports/report/report.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReportComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  balanceSheetService = inject(BalanceSheetService);

  title = 'Reports';

  data = toSignal<any>(this.balanceSheetService.balanceSheet$());

  get reports() {
    return this.data()?.Reports;
  }
}
