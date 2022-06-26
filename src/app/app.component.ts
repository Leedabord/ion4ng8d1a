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
    private dataSvc: DataService) {  }

  ngOnInit() { 
    this.dataSvc.restdbGet();

    // this.dataSvc.restdbGet().subscribe((data: any[])=>{
    //   console.log("ngOnInit-1:: ", data);
    //   this.aaposts = data;
    // })  
  
  }
}
