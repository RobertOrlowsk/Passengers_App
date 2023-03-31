import { Baggage } from 'src/app/models/baggage.interface';
import { Passenger } from 'src/app/models/passengers.interface';
import { Component, OnInit } from '@angular/core';
import { PassengerDashboardService } from '../../passenger-dashboard.service';

@Component({
  selector: 'passenger-update',
  styleUrls: ['passenger-update.component.scss'],
  template:
  `
  <div class="container">

  <button  class="show" (click)="editMe()">{{editing ? 'Close' : 'Passenger List:'}}</button>

   <div *ngIf="editing">
      <div *ngFor="let pass of passenger; let i = index">
      {{i+1}}: {{pass.fullname}}
      </div>
   </div>

   <div *ngIf="!editing">
   <button class="rename" (click)="print()">Print</button>
      <span class="print_one">
        <ng-container *ngIf="i>=1">{{i}}: </ng-container>
        {{onePassenger?.fullname ? (onePassenger?.fullname) : 'nothing to display'}}
      <br />
        <ng-container *ngIf="i>=1">
        {{onePassenger?.checkInDate ? (onePassenger?.checkInDate | date) : 'brak daty'}}
        </ng-container>
      </span>

   </div>

  </div>
  `
})
export class PassengerUpdateComponent implements OnInit{

  passenger?: Passenger[]
  onePassenger?: Passenger
  i = 0;

  editing : boolean = false;

  constructor(private passengerService: PassengerDashboardService){}

  ngOnInit(){
    this.passengerService
    .getPassengers()
    .subscribe(
     (data: Passenger[]) => { this.passenger = data})
  }

  editMe(){
    this.editing = !this.editing;
  }

  print(){
    if(this.i >=5 )this. i  = 0;
    this.i+=1; // 1 2 3 4 5 -> if

  this.passengerService.getPassenger(this.i)
  .subscribe(
    (dataOP: Passenger) => {this.onePassenger = dataOP}
  )

  }



}
