import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from "@angular/core";
import { Passenger } from "src/app/models/passengers.interface";
@Component({
    selector: 'passenger-detail',
    styleUrls: ['passenger-detail.component.scss'],
    template:
    `
    <div>
    <span class="status" [ngClass]="{'checked-in' : detail?.checkedIn}"> </span>

            <div *ngIf="editing">
            <input type="text" [value]="detail.fullname"
            (input)="onChangeName(name.value)"
             #name>
            </div>

            <div *ngIf="!editing">
            {{detail.fullname}}
            </div>

            <div class="date">
              Check in date:
              {{detail?.checkInDate ? (detail?.checkInDate | date: 'yMMMMd' | uppercase) : 'Not checked in' }}
           </div>

             <button (click)="toogleEdit()">{{editing ? 'Done' : 'Edit'}}</button>
             <button (click)="onRemove()">Remove</button>
             <button class="" (click)="goToPassenger()">View</button>
    </div>
    `
})

export class PassengerDetailComponent implements OnChanges, OnInit {
  constructor() {}

  editing: boolean = false;

  @Input()
  detail?: Passenger;
  @Output()
  edit: EventEmitter<Passenger> = new EventEmitter<Passenger>();
  @Output()
  remove: EventEmitter<Passenger> = new EventEmitter<Passenger>();
  @Output()
  view: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  ngOnChanges(changes : any) {
    if(changes.detail)
    this.detail = Object.assign( {}, changes.detail.currentValue);

  }
  ngOnInit(){}

  onChangeName(value: string){
    this.detail!.fullname = value;
  }

  toogleEdit(){
    if(this.editing)
      this.edit.emit(this.detail);

    this.editing = !this.editing;
  }

  onRemove(){
    this.remove.emit(this.detail);
  }
  goToPassenger(){
  this.view.emit(this.detail);
  }


}
