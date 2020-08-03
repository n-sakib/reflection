import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


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
