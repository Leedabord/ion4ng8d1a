import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import {MaterialExampleModule} from '../material.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule, } from '@angular/material/tabs';
import {MatNativeDateModule} from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';

import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { FirebaseAuthService } from './firebase-auth.service';
import { Random } from 'random-js';

/*  */

@NgModule({
  declarations: [    AppComponent  ],
  entryComponents: [  ],
  imports: [ BrowserModule, BrowserAnimationsModule,
    IonicModule.forRoot(), AppRoutingModule,
    MatButtonModule, MatTabsModule,  MatCardModule,        
    MatNativeDateModule,  MaterialExampleModule, 
    MatBadgeModule,  MatIconModule,  
    FormsModule, ReactiveFormsModule, HttpClientModule,  
  AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
],
  providers: [
    FirebaseAuthService,
    AngularFireDatabase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

/*  */