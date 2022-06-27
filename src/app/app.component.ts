import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  aaposts = [];
  status = "null";

  constructor(private platform: Platform,
    private dataSvc: DataService) { 

      dataSvc.rdbGet().subscribe((data: any[])=>{
        this.aaposts = data;
        console.log("appC aaposts:: ", this.aaposts);
        console.log("aaposts:: >>", dataSvc.status, dataSvc.aaposts);
        }) 
  
     }

  ngOnInit() { 
  
  }
}
