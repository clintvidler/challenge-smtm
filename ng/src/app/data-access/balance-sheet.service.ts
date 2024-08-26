import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BalanceSheetService {
  private http = inject(HttpClient);

  balanceSheet$(): Observable<any> {
    const url = environment.server;

    return this.http.get<any>(url).pipe(
      tap((resp) => console.log(resp)),
      catchError((err) => {
        console.log(err.error);

        return EMPTY;
      })
    );
  }
}
