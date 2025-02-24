import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostelsComponent } from './hostels/hostels.component';
import { NewBookingComponent } from './new-booking/new-booking.component';

const routes: Routes = [
  {path:"hostels", component:HostelsComponent},
  {path:"newBooking", component:NewBookingComponent},
  {path:"", redirectTo:"hostels", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
