import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
   testimonials = [];
  
   list$: BehaviorSubject<any[]> = new BehaviorSubject(this.testimonials);

 
  constructor(private database: AngularFireDatabase) { 
   
   }

  dataCall(){
    console.log("baal")
    this.database.list('testimonials/').snapshotChanges()
      .subscribe({
        next: testimonials => {
  
          testimonials.forEach(testimonials => {
            var testiObject: any = {
            };
             var val = testimonials.payload.val();
            this.testimonials.push(val);  
          });
         
          console.log(this.testimonials)
        },
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => { console.log("done") }
      })
  
    }
  

}

