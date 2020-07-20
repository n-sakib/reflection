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
   testimonials$: BehaviorSubject<any[]> = new BehaviorSubject(this.testimonials);

  constructor(private database: AngularFireDatabase) { 
    this.database.list('testimonials/').snapshotChanges()
      .subscribe({
        next: testimonials => {
          testimonials.forEach(testimonials => {
            var val:any = testimonials.payload.val();
            val.key = testimonials.key;
            this.testimonials.push(val);  
            this.testimonials$.next(this.testimonials)
          });
        },
        error: err => console.error('something wrong occurred: ' + err)
      })
   }

   public getTestimonials(): Observable<any[]> {
    return this.testimonials$.asObservable();
  }

   update(index, field, value) {

    this.testimonials = this.testimonials.map((e, i) => {
      if (index === i) {
        return {
          ...e,
          [field]: value
        }
      }
      return e;
    });
    console.log(this.testimonials[index])
    this.database.list('testimonials/').set(this.testimonials[index].key, this.testimonials[index]);
    this.testimonials$.next(this.testimonials);
  }
}

