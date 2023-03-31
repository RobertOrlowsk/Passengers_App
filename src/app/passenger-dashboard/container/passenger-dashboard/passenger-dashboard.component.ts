import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Passenger } from '../../../models/passengers.interface';
import { PassengerDashboardService } from '../../passenger-dashboard.service';

@Component({
    selector: 'passenger-dashboard',
    styleUrls: ['passenger-dashboard.component.scss'],
    template:
    `
    <div class="content">
     <div class="passenger_name">
      <div class="passenger_name__display"  *ngFor="let passenger of passengers">
       {{passenger.fullname}}
      </div>
     </div>

    <passenger-count
      [items]="passengers"
    ></passenger-count>

    <passenger-detail
    *ngFor="let passenger of passengers;"
    [detail]="passenger"
    (edit)="handleEdit($event)"
    (remove)="handleRemove($event)"
    (view)="handleView($event)"
    >
    </passenger-detail>
    </div>
    `
})
export class PassengerDashboardComponent implements OnInit{

  passengers: Passenger[] | undefined

  constructor(
    private router: Router,
    private passengerService: PassengerDashboardService
    ) {}

  ngOnInit() {
    this.passengerService
     .getPassengers()
     .subscribe(
       (data: Passenger[]) =>{this.passengers = data})
 }
  handleRemove(event: Passenger){
    this.passengerService
    .removePassengers(event)
    .subscribe((data: Passenger) =>{
      this.passengers = this.passengers?.filter( (passenger: Passenger) => {
        return passenger.id !== event.id;
    })

    } )
  }
  handleEdit(event: Passenger){
    this.passengerService
    .updatePassengers(event)
     .subscribe((data: Passenger) =>{
      this.passengers = this.passengers?.map( (passenger: Passenger) =>{
        if(passenger.id === event.id )
        { passenger = Object.assign({}, passenger, event)}
        return passenger;
      })
    })
  }
  handleView(event: Passenger){
  this.router.navigate(['/passengers',event.id])
  }
}
