import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EMPTY } from 'rxjs';

import { BalanceSheetService } from './balance-sheet.service';
import { environment } from '@environments/environment';

describe('BalanceSheetService', () => {
  let service: BalanceSheetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(BalanceSheetService);

    service = TestBed.inject(BalanceSheetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP GET request to the correct URL', () => {
    service.balanceSheet$().subscribe();

    const req = httpMock.expectOne(environment.server);
    expect(req.request.method).toBe('GET');
  });

  it('should return the response correctly', () => {
    const mockResponse = { data: 'test data' };

    service.balanceSheet$().subscribe((resp) => {
      expect(resp).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.server);
    req.flush(mockResponse);
  });

  it('should handle errors and return EMPTY', () => {
    spyOn(console, 'log');

    service.balanceSheet$().subscribe(
      (resp) => {
        expect(resp).toBe(EMPTY);
      },
      (error) => {
        expect(error).toBeUndefined();
      }
    );

    const req = httpMock.expectOne(environment.server);
    req.flush('error', { status: 500, statusText: 'Server Error' });

    expect(console.log).toHaveBeenCalledWith('error');
  });

  it('should log the response in the console', () => {
    const mockResponse = { data: 'test data' };
    spyOn(console, 'log');

    service.balanceSheet$().subscribe();

    const req = httpMock.expectOne(environment.server);
    req.flush(mockResponse);

    expect(console.log).toHaveBeenCalledWith(mockResponse);
  });
});
