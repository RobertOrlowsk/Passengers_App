
import { Passenger } from '../models/passengers.interface';

import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const PASSENGER_API: string = ('http://localhost:3000/passengers');

@Injectable()
export class PassengerDashboardService {
  constructor(private http: Http) {}

  getPassengers(): Observable<Passenger[]> {
    return this.http
      .get(PASSENGER_API)
      .pipe(
      map((response: Response) => response.json()),
      catchError((e: any) =>{
        return throwError(e);
      })
  )}

  getPassenger(id: number): Observable<Passenger> {
    return this.http
      .get(`${PASSENGER_API}/${id}`)
      .pipe(
      map((response: Response) => response.json()),
      catchError((e: any) =>{
        return throwError(e);
      })
  )}

  updatePassengers(passenger: Passenger): Observable<Passenger> {
    let headers = new Headers({
      'Content-type' : 'application/json'
    })
    let option = new RequestOptions({
      headers : headers
    })
    return this.http
      .put(`${PASSENGER_API}/${passenger.id}`, passenger, option)
      .pipe(
      map((response: Response) => response.json())
      )
  }

  removePassengers(passenger: Passenger): Observable<Passenger> {
    return this.http
      .delete(`${PASSENGER_API}/${passenger.id}`)
      .pipe(
      map((response: Response) => response.json())
      )
  }
}
