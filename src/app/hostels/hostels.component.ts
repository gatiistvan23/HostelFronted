import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hostels',
  templateUrl: './hostels.component.html',
  styleUrl: './hostels.component.css'
})
export class HostelsComponent {
  hostels:any

  constructor(private base:BaseService, public router:Router){
      this.base.getHostels().subscribe(
        (res:any)=>{
          for(const element of res) {
            this.hostels.push({visible:false, ...element})
          }          
        }
      )
    }
}
