import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Passenger } from '../../../models/passengers.interface';
import { Baggage } from "src/app/models/baggage.interface";
@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template: `

  <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>

    Tablica na sztywno: <div class="sztywna">{{ detail | json }}</div>
  <div>
    Passenger name:
    <input
    type="text"
    name="fullname"
    required
    #fullname="ngModel"
    [ngModel]="detail?.fullname">
      <div  *ngIf="fullname.errors?.required && fullname.dirty" class="error">
        Imię passengera jest wymagane kolezkowcu drogi szanowny.
      </div>
    </div>

    <div>
    Passenger ID:
    <input
    type="text"
    name="id"
    required
    #id="ngModel"
    [ngModel]="detail?.id">
    <div  *ngIf="id.errors?.required && id.dirty" class="error">
        Id passengera jest wymagane kolezkowcu drogi szanowny.
      </div>
    </div>

    <div>
      <label>
        <input
        type="checkbox"
        name="checkedIn"
        [ngModel]="detail?.checkedIn"
        (ngModelChange)="toggleChange($event)">

      </label>

    </div>

    <div *ngIf="form.value.checkedIn">
        <input
        type="number"
        name="checkInDate"
        [ngModel]="detail?.checkInDate">
    </div>

      <div>
        Luggage:
        <select
        name="baggage"
        [ngModel]="detail?.baggage">
          <option *ngFor="let item of baggage"
          [value]="item.key"
          [selected]="item.key === detail?.baggage">
            {{item.value}}
          </option>
        </select>
        </div>

   <p>Form:</p>
    <p [style]="'color: green'">{{form.value | json}}</p>
      <button type="submit" [disabled]="form.invalid">Aktualizuj passengera kolezko</button>
  </form>
  `
})
export class PassengerFormComponent{
  @Input()
  detail?: Passenger;
  @Output()
  update?: EventEmitter<Passenger>= new EventEmitter()

  baggage: Baggage[] = [{
    key: 'none',
    value: 'No baggage'
  },{
    key: 'hand-only',
    value: 'Hand baggage'
  },{
    key: 'hand-only',
    value: 'Hold baggage'
  },{
    key: 'hand-only',
    value: 'Hand and Hold baggage'
  }];

  toggleChange(checkedIn: boolean){
    if(checkedIn){
      this.detail!.checkInDate = Date.now();
    }
  }

handleSubmit(passenger: Passenger, isValid: boolean){
    if(isValid){
        this.update?.emit(passenger);
    }
  }
}
