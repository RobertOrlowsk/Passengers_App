import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { PassengerDashboardComponent } from './container/passenger-dashboard/passenger-dashboard.component';
import { PassengerViewComponent } from './container/passenger-viewer/passenger-viewer.component';
import { PassengerFormComponent } from './components/passenger-form/passenger-form.component';

import { PassengerCountComponent } from './components/passenger-count/passenger-count.component';
import { PassengerDetailComponent } from './components/passenger-detail/passenger-detail.component';
import { PassengerUpdateComponent } from './container/passenger-update-solo/passenger-update.component';

import { PassengerDashboardService } from './passenger-dashboard.service';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  {
    path: 'passengers',
    children:[
      { path: '',   component: PassengerDashboardComponent},
      { path: ':id', component: PassengerViewComponent}
    ]

  },
  {
    path: 'passenger-update-solo', component: PassengerUpdateComponent
  }
]

@NgModule({
    declarations:[
        PassengerDashboardComponent,
        PassengerCountComponent,
        PassengerDetailComponent,
        PassengerViewComponent,
        PassengerFormComponent,
        PassengerUpdateComponent,
    ],
    imports:[
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [
      PassengerDashboardService
    ]
})

export class PassengerDashboardModule{}
