import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Random } from "random-js";

import { PopoverController, ToastController } from '@ionic/angular';
import { Tab2aPage } from '../tab2a/tab2a.page';
import { DataService } from '../services/data.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page { 

quotes = [];  
status = "nothing";
tvalue: number; trandom: Random;
skins: { name: string; ws: number; sf9: number; sb9: number; s18: number; harr: { par: number; hcap: number; hs: number; }[]; }[];

  constructor(
    dataSvc: DataService, 
    public popoverController: PopoverController,
    public toastCtrl: ToastController
    ) { 
    
    this.status = dataSvc.status;
    dataSvc.rdbGet().subscribe((data: any[])=>{
      this.quotes = data;
      console.log("this.quotes:: ", this.quotes);
    }) 
  }

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
  }

}