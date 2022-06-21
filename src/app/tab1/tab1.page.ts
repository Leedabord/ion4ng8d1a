import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import { Random } from "random-js";

import { PopoverController, ToastController } from '@ionic/angular';
import { Tab2aPage } from '../tab2a/tab2a.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page { 

  readonly airtableURL = 'https://gwfl-256d.restdb.io/rest/utility';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-apikey': '5821f61550e9b39131fe1b6f'  // 569a2b87566759cf4b984a50'  // 5821f61550e9b39131fe1b6f
    })
  }
  
// readonly airtableURL =   
// 'https://api.airtable.com/v0/app0hohtq4b1nM0Kb/Scores?api_key=key66fQg5IghIIQmb'; 

//  'https://api.airtable.com/v0/app0hohtq4b1nM0Kb/FavQuotes?api_key=key66fQg5IghIIQmb'; 
// 'https://api.airtable.com/v0/app0hohtq4b1nM0Kb/pluART/rec1cU5MrjwTj3kGy?api_key=key66fQg5IghIIQmb' ;
// readonly favQuotesURL = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`);
// readonly favQuotesURL = 'https://jsonplaceholder.typicode.com/posts';
// const httpH = new HttpHeaders().set('Authorization', 'Bearer key66fQg5IghIIQmb');

quotes: Observable<any>;  
tvalue: number; trandom: Random;
skins: { name: string; ws: number; sf9: number; sb9: number; s18: number; harr: { par: number; hcap: number; hs: number; }[]; }[];

  constructor(
    private httpC: HttpClient, 
    public popoverController: PopoverController,
    public toastCtrl: ToastController
    ) {

      this.httpC.get<any>(this.airtableURL, this.httpOptions).subscribe(
      data => {
          this.quotes = data;
        console.log('qq:: ', this.quotes);
      },
      error => { console.error('http:: That.s an error!', error) }
  )

}

/* 
// ES6 Modules
import { Random } from "random-js";
const random = new Random(); // uses the nativeMath engine
const value = random.integer(1, 100);
// 
totalAngularPackages;
        // Simple GET request with response type <any>
     this.httpC.get<any>('https://api.npms.io/v2/search?q=scope:angular').subscribe(data => {
            this.totalAngularPackages = data.total;
      console.log('ngOnInit:: ', this.totalAngularPackages, ' ::');
        });

//  const httpH = new HttpHeaders().set('Authorization', 'Bearer key66fQg5IghIIQmb');
interface SearchResults {
    total: number;
    results: Array<object>;
}
const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
this.http.get<SearchResults>('https://api.npms.io/v2/search?q=scope:angular', { headers }).subscribe(
  data => {
    this.totalAngularPackages = data.total;
  },
  error => { console.error('There was an error!', error) }
)
*/

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: Tab2aPage,
      event: ev,
      popoverController: this.popoverController,
      backdropDismiss: true
    });
    return await popover.present();
  }

  
  async presentToast() {

  this.trandom = new Random(); // uses the nativeMath engine
  this.tvalue = this.trandom.integer(1, 25);
 console.log('val:: ', this.tvalue, this.quotes[this.tvalue -1].fields.groupKey);
  
  this.skins = [ {name: "", ws: 0, sf9: 0, sb9: 0, s18: 0, 
  harr: [ { par: 4, hcap: 0, hs: 0 } ] } ];
  
    const toast = await this.toastCtrl.create({
      message: this.quotes[this.tvalue -1].fields.groupKey,
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

}

/* 
    const toast = await this.toastCtrl.create({
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea voluptatibus quibusdam eum nihil optio, ullam accusamus magni, nobis suscipit reprehenderit, sequi quam amet impedit. Accusamus dolorem voluptates laborum dolor obcaecati.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea voluptatibus quibusdam eum nihil optio, ullam accusamus magni, nobis suscipit reprehenderit, sequi quam amet impedit. Accusamus dolorem voluptates laborum dolor obcaecati.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea voluptatibus quibusdam eum nihil optio, ullam accusamus magni, nobis suscipit reprehenderit, sequi quam amet impedit. Accusamus dolorem voluptates laborum dolor obcaecati.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea voluptatibus quibusdam eum nihil optio, ullam accusamus magni, nobis suscipit reprehenderit, sequi quam amet impedit. Accusamus dolorem voluptates laborum dolor obcaecati.',
      position: 'middle',
      duration: 3000
    });

  showToastWithCloseButton() {
    const toast = this.toastCtrl.create({
      message: 'Your internet connection appears to be offline. Data integrity is not guaranteed.',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.onDidDismiss(this.dismissHandler);
    toast.present();
  }

  private dismissHandler() {
    console.log('Toast onDidDismiss()');
  }

  constructor(public toastController: ToastController) {}

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}

*/
