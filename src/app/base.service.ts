import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  url="http://localhost:3000/api/"
  constructor(private http:HttpClient) {}
   
   getHostels(){
    return this.http.get(this.url+"Hostels")
   }
   getBookings(){
    return this.http.get(this.url+"Bookings")
   }
   newBooking(booking:any){
    return this.http.post(this.url+"Bookings",booking)
   }
}
