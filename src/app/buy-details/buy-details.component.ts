import { Component, OnInit , Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-buy-details',
  templateUrl: './buy-details.component.html',
  styleUrls: ['./buy-details.component.css']
})
export class BuyDetailsComponent implements OnInit {

  @Input() paintingInfo;

  constructor() { }

  ngOnInit(): void {
    console.log(this.paintingInfo)
  }

}
