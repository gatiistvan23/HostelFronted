import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from '../base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrl: './new-booking.component.css'
})
export class NewBookingComponent {
	calendar = inject(NgbCalendar);

	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate = this.calendar.getToday();
	toDate: NgbDate | null = this.calendar.getNext(this.fromDate, 'd', 10);

  hostels:any
  bookingHostel:any=0
  guest:any=1

  error=false
  errorMessage=""

  constructor(private base:BaseService, private router:Router){
    this.base.getHostels().subscribe(
      (res)=>this.hostels=res
    )
  }

  dateConverter(date:any){
    return date.year+"-"+(date.month<10?"0"+date.month:date.month)+"-"+(date.day<10?"0"+date.day:date.day)
  }

  newBooking(){
    const body={
      checkIn: this.dateConverter(this.fromDate),
      checkOut: this.dateConverter(this.toDate),
      guests:this.guest,
      hostelId:Number(this.bookingHostel)
    }
    this.base.newBooking(body).subscribe(
      {
        next:()=>{
          console.log("Sikeres foglalás!")
          this.error=false
          this.router.navigate(['/hostels'])
        },
        error:(err)=>{
          this.error=true
          this.errorMessage="Hiba a foglalás feldolgozásánál!"+err
          console.log("Hiba a foglalásnál!")
        }
      }
    )
    console.log(body)
  }

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}
}