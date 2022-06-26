import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, retry, catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  aaposts: [ {utilkey: "utilkey001" } ];
  status = "null";

  readonly restdbURL = 'https://gwfl-256d.restdb.io/rest/utility';
//  'https://api.airtable.com/v0/app0hohtq4b1nM0Kb/FavQuotes?api_key=key66fQg5IghIIQmb';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-apikey': '5821f61550e9b39131fe1b6f'  // 569a2b87566759cf4b984a50'  // 5821f61550e9b39131fe1b6f
    })
  }

  private contacts: Contact[];

  private lastId: number = 20;

  constructor(private httpC: HttpClient) { }

  restdbGet() { 
    this.httpC.get<any>(this.restdbURL, this.httpOptions).subscribe(
      data => {
        this.aaposts = data;
        this.status = 'restdbGet-ok';
        console.log('restdbGet:: ', this.aaposts, ' ::', this.status);
      },
      error => { console.error('restdbGet:: That-s an error!', error) }
    )
  }

  public sendGetRequest(){
    return this.httpC.get(this.restdbURL, this.httpOptions).pipe(retry(3)); // , catchError(this.handleError)
  }

  restdbDel() { 
    var delURL = this.restdbURL + '/5f6ab12510feee5100017131';
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

  getContacts(): Observable<Contact[]> {
    if (this.contacts) {
      return of(this.contacts);
    } else {
      // fetch contacts
      return this.httpC.get<Contact[]>('./assets/contacts.json')
      .pipe(tap(contacts => this.contacts = contacts));
    }
  }

  getContactsByCategory(category: string): Observable<Contact[]> {
    return this.getContacts().pipe(map(contacts => contacts.filter(contact => contact.category == category)));
  }

  getContactById(id: number): Observable<Contact> {
    return this.getContacts().pipe(map(contacts => contacts.find(contact => contact.id == id)));
  }

  createContact(contact: Contact) {
    contact.id = this.lastId + 1;
    // increment lastId value
    this.lastId = this.lastId + 1;
    this.contacts.push(contact);
  }

  updateContact(contact: Contact): Contact {
    let itemIndex = this.contacts.findIndex(item => item.id == contact.id);
    this.contacts[itemIndex] = contact;
    return contact;
  }

  deleteContact(id: number): Contact {
    let itemIndex = this.contacts.findIndex(item => item.id == id);
    return this.contacts.splice(itemIndex, 1)[0];
  }
}