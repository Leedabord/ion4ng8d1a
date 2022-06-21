import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  aaposts: Observable<any>;
  status = "null";

  readonly favQuotesURL = 'https://gwfl-256d.restdb.io/rest/utility';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-apikey': '5821f61550e9b39131fe1b6f'  // 569a2b87566759cf4b984a50'  // 5821f61550e9b39131fe1b6f
    })
  }
  
//  'https://api.airtable.com/v0/app0hohtq4b1nM0Kb/FavQuotes?api_key=key66fQg5IghIIQmb';

  constructor(
    private httpC: HttpClient, 
    private platform: Platform
    ) {  }

  ngOnInit() { 
    this.httpC.get<any>(this.favQuotesURL, this.httpOptions).subscribe(
      data => {
        this.aaposts = data;
      console.log('ngOnInit:: ', this.aaposts, ' ::');
      },
      error => { console.error('AppC:: That-s an error!', error) }
    )

    var delURL = this.favQuotesURL + '/5f6ab12510feee5100017131';
    this.httpC.delete(delURL, this.httpOptions)
    .subscribe({
        next: data => {
            this.status = 'Delete successful';
            console.log(this.status);
        },
        error: error => {
            this.status = error.message;
            console.error('Err Deleting:: ', this.status);
        }
    });
  }
}