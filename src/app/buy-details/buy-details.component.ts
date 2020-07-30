import { Component, OnInit , Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-buy-details',
  templateUrl: './buy-details.component.html',
  styleUrls: ['./buy-details.component.css']
})
export class BuyDetailsComponent implements OnInit {

  gallery;

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    
    this.activatedRoute.queryParams.subscribe(params => {
      this.gallery = JSON.parse(params["gallery"]);
      // console.log(JSON.parse(params["gallery"]))
    });
     
  }
  

}
